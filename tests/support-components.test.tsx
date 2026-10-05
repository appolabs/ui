import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import {
  ChatBubble,
  ChatComposer,
  DataTable,
  EmptyState,
  StatusBadge,
} from '../src/index';

describe('EmptyState', () => {
  it('renders title, description, icon and action', () => {
    render(
      <EmptyState
        icon={<svg data-testid="icon" />}
        title="No tickets yet"
        description="Open one to get help."
        action={<button>Open a ticket</button>}
      />
    );

    expect(screen.getByText('No tickets yet')).toBeInTheDocument();
    expect(screen.getByText('Open one to get help.')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open a ticket' })).toBeInTheDocument();
  });

  it('renders the title alone', () => {
    render(<EmptyState title="Nothing here" />);

    expect(screen.getByText('Nothing here')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeNull();
  });
});

describe('DataTable', () => {
  type Row = { id: number; subject: string; status: string };

  const rows: Row[] = [
    { id: 1, subject: 'Cannot publish', status: 'Open' },
    { id: 2, subject: 'Icon is blurry', status: 'Closed' },
  ];

  const columns = [
    { id: 'subject', header: 'Subject', cell: (row: Row) => row.subject },
    { id: 'status', header: 'Status', cell: (row: Row) => row.status },
  ];

  it('renders a table with a header and one row per record', () => {
    render(<DataTable columns={columns} rows={rows} rowKey={(row) => row.id} />);

    const table = screen.getByRole('table');
    expect(within(table).getAllByRole('columnheader').map((th) => th.textContent)).toEqual(['Subject', 'Status']);
    expect(within(table).getAllByRole('row')).toHaveLength(3);
    expect(within(table).getByText('Icon is blurry')).toBeInTheDocument();
  });

  it('renders the same records as stacked cards with labelled values', () => {
    render(<DataTable columns={columns} rows={rows} rowKey={(row) => row.id} />);

    const cards = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(cards).toHaveLength(2);
    expect(within(cards[0]).getByText('Subject')).toBeInTheDocument();
    expect(within(cards[0]).getByText('Cannot publish')).toBeInTheDocument();
    expect(within(cards[1]).getByText('Closed')).toBeInTheDocument();
  });

  it('renders custom cell content', () => {
    render(
      <DataTable
        columns={[{ id: 'link', header: 'Subject', cell: (row: Row) => <a href={`/t/${row.id}`}>{row.subject}</a> }]}
        rows={rows}
        rowKey={(row) => row.id}
      />
    );

    expect(screen.getAllByRole('link', { name: 'Cannot publish' })[0]).toHaveAttribute('href', '/t/1');
  });
});

describe('ChatBubble', () => {
  it('renders the text, author and timestamp and exposes its side', () => {
    render(
      <ChatBubble side="start" author="Alberto" timestamp="10:02">
        Looking into it.
      </ChatBubble>
    );

    expect(screen.getByText('Looking into it.')).toBeInTheDocument();
    expect(screen.getByText('Alberto')).toBeInTheDocument();
    expect(screen.getByText('10:02')).toBeInTheDocument();
    expect(screen.getByText('Looking into it.').closest('[data-side]')).toHaveAttribute('data-side', 'start');
  });

  it('renders markup characters as text', () => {
    render(<ChatBubble side="end">{'Thanks <b>a lot</b>'}</ChatBubble>);

    expect(screen.getByText('Thanks <b>a lot</b>')).toBeInTheDocument();
  });
});

describe('ChatComposer', () => {
  function setup(onSend = vi.fn().mockResolvedValue(undefined), onError = vi.fn()) {
    render(<ChatComposer onSend={onSend} onError={onError} placeholder="Write a message" sendLabel="Send" maxLength={4000} />);
    const field = screen.getByPlaceholderText('Write a message') as HTMLTextAreaElement;

    return { onSend, onError, field, button: screen.getByRole('button', { name: 'Send' }) };
  }

  it('sends the trimmed text and clears the field', async () => {
    const { onSend, field, button } = setup();

    fireEvent.change(field, { target: { value: '  Hello there  ' } });
    fireEvent.click(button);

    await waitFor(() => expect(onSend).toHaveBeenCalledWith('Hello there'));
    await waitFor(() => expect(field.value).toBe(''));
  });

  it('sends on Enter and keeps typing on Shift+Enter', async () => {
    const { onSend, field } = setup();

    fireEvent.change(field, { target: { value: 'Hello' } });
    fireEvent.keyDown(field, { key: 'Enter', shiftKey: true });
    expect(onSend).not.toHaveBeenCalled();

    fireEvent.keyDown(field, { key: 'Enter' });
    await waitFor(() => expect(onSend).toHaveBeenCalledTimes(1));
  });

  it('does not send blank text and disables the button', () => {
    const { onSend, field, button } = setup();

    fireEvent.change(field, { target: { value: '   ' } });
    fireEvent.keyDown(field, { key: 'Enter' });

    expect(onSend).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('keeps the draft and reports the error when sending fails', async () => {
    const error = new Error('network');
    const { onError, field, button } = setup(vi.fn().mockRejectedValue(error));

    fireEvent.change(field, { target: { value: 'Hello' } });
    fireEvent.click(button);

    await waitFor(() => expect(onError).toHaveBeenCalledWith(error));
    expect(field.value).toBe('Hello');
  });

  it('exposes the field as a textbox named by the placeholder', () => {
    setup();

    expect(screen.getByRole('textbox', { name: 'Write a message' })).toBeInTheDocument();
  });

  it('does not send on Enter while an input method is composing', () => {
    const { onSend, field } = setup();

    fireEvent.change(field, { target: { value: 'konnichiwa' } });
    fireEvent.keyDown(field, { key: 'Enter', isComposing: true });

    expect(onSend).not.toHaveBeenCalled();
  });

  it('disables the button and ignores a second click while sending', async () => {
    let resolve: () => void = () => {};
    const pending = new Promise<void>((done) => {
      resolve = done;
    });
    const { onSend, field, button } = setup(vi.fn().mockReturnValue(pending));

    fireEvent.change(field, { target: { value: 'Hello' } });
    fireEvent.click(button);
    await waitFor(() => expect(button).toBeDisabled());
    fireEvent.click(button);

    expect(onSend).toHaveBeenCalledTimes(1);

    resolve();
    await waitFor(() => expect(field.value).toBe(''));
  });

  it('keeps the draft when sending fails and no onError is given', async () => {
    const onSend = vi.fn().mockRejectedValue(new Error('network'));
    render(<ChatComposer onSend={onSend} placeholder="Write a message" sendLabel="Send" />);
    const field = screen.getByPlaceholderText('Write a message') as HTMLTextAreaElement;

    fireEvent.change(field, { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => expect(onSend).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Send' })).not.toBeDisabled());
    expect(field.value).toBe('Hello');
  });

  it('applies the maximum length', () => {
    const { field } = setup();

    expect(field).toHaveAttribute('maxlength', '4000');
  });
});

describe('StatusBadge ticket statuses', () => {
  it('renders open and closed with their default labels', () => {
    render(
      <>
        <StatusBadge status="open" />
        <StatusBadge status="closed" />
      </>
    );

    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('Closed')).toBeInTheDocument();
  });

  it('prefers a label passed by the host', () => {
    render(<StatusBadge status="open" label="Aperto" />);

    expect(screen.getByText('Aperto')).toBeInTheDocument();
  });
});
