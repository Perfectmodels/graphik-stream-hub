
import React, { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalyticsTabsProps {
  activitiesContent: ReactNode;
  subscriptionsContent: ReactNode;
  revenueContent: ReactNode;
}

const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({
  activitiesContent,
  subscriptionsContent,
  revenueContent
}) => {
  return (
    <Tabs defaultValue="activities" className="mb-6">
      <TabsList className="bg-graphik-light-grey/20">
        <TabsTrigger value="activities">Activités</TabsTrigger>
        <TabsTrigger value="subscriptions">Abonnements</TabsTrigger>
        <TabsTrigger value="revenue">Revenus</TabsTrigger>
      </TabsList>
      
      <TabsContent value="activities" className="mt-4">
        {activitiesContent}
      </TabsContent>
      
      <TabsContent value="subscriptions" className="mt-4">
        {subscriptionsContent}
      </TabsContent>
      
      <TabsContent value="revenue" className="mt-4">
        {revenueContent}
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsTabs;
