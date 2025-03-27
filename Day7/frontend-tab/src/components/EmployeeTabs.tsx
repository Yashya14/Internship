import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import tabsData from "../tabs.json";
import '../App.css';

interface TabData {
  id: string;
  name: string;
  index: number;
}

const EmployeeTabs: React.FC = () => {
  const sortedTabs = [...tabsData].sort((a, b) => a.index - b.index);
  const [activeTab, setActiveTab] = useState<string>(sortedTabs[0]?.id || "");

  const handleSwitchTabs = (selectedKey: string | null) => {
    if (selectedKey) {
      setActiveTab(selectedKey);
    }
  };

  return (
    <>
      <h1 className='text-center py-2 pb-2 heading'>TeamSphere</h1>
      <div className="dynamic-tabs p-3 mt-2">
        <Tabs
          id="controlled-tabs"
          activeKey={activeTab}
          onSelect={handleSwitchTabs}
          className="mb-2"
        >
          {tabsData.map((tab: TabData) => (
            <Tab eventKey={tab.id} title={tab.name} key={tab.id}>
              <div>
                <h4>{tab.name} Content</h4>
                <p>
                  {tab.name} Content is displayed here. You can add your content
                  here.
                </p>
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default EmployeeTabs;
