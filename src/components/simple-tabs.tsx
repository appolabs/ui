export interface TabItem {
  id: string;
  label: string;
}

export interface SimpleTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function SimpleTabs({tabs, activeTab, onTabChange}: SimpleTabsProps) {
    return (
        <div className="flex gap-1 rounded-lg bg-muted/50 p-1">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`
                            flex flex-1 items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-all
                            ${isActive
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                            }
                        `}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
