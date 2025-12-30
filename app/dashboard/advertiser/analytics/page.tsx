import { AdvertiserSidebar } from "@/components/advertiser-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdvertiserAnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col">
    

      <div className="flex-1 flex">
        <AdvertiserSidebar />

        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Campaign Analytics</h1>

            <div className="flex items-center gap-4">
              <Select defaultValue="30days">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">Last year</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">Export Report</Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4 mb-6">
            {[
              { title: "Total Impressions", value: "124,568", change: "+12.5%", changeType: "positive" },
              { title: "Total Clicks", value: "3,842", change: "+8.2%", changeType: "positive" },
              { title: "Average CTR", value: "3.08%", change: "-0.4%", changeType: "negative" },
              { title: "Estimated ROI", value: "215%", change: "+18.3%", changeType: "positive" },
            ].map((stat, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change} from previous period
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">Campaign Breakdown</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Over Time</CardTitle>
                  <CardDescription>Track impressions, clicks, and CTR over the selected time period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                    Performance Chart Placeholder
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Campaigns</CardTitle>
                    <CardDescription>Campaigns with the highest engagement rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Summer Sale Promotion", impressions: "45,231", ctr: "4.2%" },
                        { name: "Product Launch", impressions: "32,456", ctr: "3.8%" },
                        { name: "Brand Awareness", impressions: "28,974", ctr: "2.9%" },
                      ].map((campaign, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                        >
                          <div>
                            <div className="font-medium">{campaign.name}</div>
                            <div className="text-sm text-muted-foreground">{campaign.impressions} impressions</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{campaign.ctr}</div>
                            <div className="text-sm text-muted-foreground">CTR</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Placement Performance</CardTitle>
                    <CardDescription>Engagement by ad placement location</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] bg-muted rounded-md flex items-center justify-center text-muted-foreground mb-4">
                      Placement Chart Placeholder
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "Homepage Banner", ctr: "3.8%" },
                        { name: "Article Sidebar", ctr: "2.9%" },
                        { name: "In-content", ctr: "4.2%" },
                      ].map((placement, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="text-sm">{placement.name}</div>
                          <div className="text-sm font-medium">{placement.ctr} CTR</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance Comparison</CardTitle>
                  <CardDescription>Compare the performance of your active campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-6 p-4 font-medium border-b">
                      <div>Campaign</div>
                      <div>Status</div>
                      <div>Impressions</div>
                      <div>Clicks</div>
                      <div>CTR</div>
                      <div>Cost per Click</div>
                    </div>

                    {[
                      {
                        name: "Summer Sale",
                        status: "Active",
                        impressions: "45,231",
                        clicks: "1,892",
                        ctr: "4.2%",
                        cpc: "$0.42",
                      },
                      {
                        name: "Product Launch",
                        status: "Active",
                        impressions: "32,456",
                        clicks: "1,233",
                        ctr: "3.8%",
                        cpc: "$0.51",
                      },
                      {
                        name: "Brand Awareness",
                        status: "Paused",
                        impressions: "28,974",
                        clicks: "841",
                        ctr: "2.9%",
                        cpc: "$0.63",
                      },
                      {
                        name: "Holiday Special",
                        status: "Scheduled",
                        impressions: "0",
                        clicks: "0",
                        ctr: "0%",
                        cpc: "$0.00",
                      },
                    ].map((campaign, index) => (
                      <div key={index} className="grid grid-cols-6 p-4 border-b last:border-0">
                        <div className="font-medium">{campaign.name}</div>
                        <div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              campaign.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : campaign.status === "Paused"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {campaign.status}
                          </span>
                        </div>
                        <div>{campaign.impressions}</div>
                        <div>{campaign.clicks}</div>
                        <div>{campaign.ctr}</div>
                        <div>{campaign.cpc}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance Trends</CardTitle>
                  <CardDescription>Track how your campaigns perform over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                    Campaign Trends Chart Placeholder
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="demographics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Age Distribution</CardTitle>
                    <CardDescription>Age breakdown of users who engaged with your ads</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-muted rounded-md flex items-center justify-center text-muted-foreground mb-4">
                      Age Chart Placeholder
                    </div>
                    <div className="space-y-2">
                      {[
                        { age: "18-24", percentage: "15%" },
                        { age: "25-34", percentage: "32%" },
                        { age: "35-44", percentage: "28%" },
                        { age: "45-54", percentage: "18%" },
                        { age: "55+", percentage: "7%" },
                      ].map((group, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="text-sm">{group.age}</div>
                          <div className="text-sm font-medium">{group.percentage}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Gender Distribution</CardTitle>
                    <CardDescription>Gender breakdown of users who engaged with your ads</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-muted rounded-md flex items-center justify-center text-muted-foreground mb-4">
                      Gender Chart Placeholder
                    </div>
                    <div className="space-y-2">
                      {[
                        { gender: "Male", percentage: "48%" },
                        { gender: "Female", percentage: "51%" },
                        { gender: "Other", percentage: "1%" },
                      ].map((group, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="text-sm">{group.gender}</div>
                          <div className="text-sm font-medium">{group.percentage}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Location of users who engaged with your ads</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] bg-muted rounded-md flex items-center justify-center text-muted-foreground mb-4">
                    Map Placeholder
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { region: "New York", percentage: "18%" },
                      { region: "California", percentage: "15%" },
                      { region: "Texas", percentage: "12%" },
                      { region: "Florida", percentage: "10%" },
                      { region: "Illinois", percentage: "8%" },
                      { region: "Pennsylvania", percentage: "7%" },
                      { region: "Ohio", percentage: "6%" },
                      { region: "Other", percentage: "24%" },
                    ].map((region, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="text-sm">{region.region}</div>
                        <div className="text-sm font-medium">{region.percentage}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Device Type</CardTitle>
                    <CardDescription>Breakdown of devices used to view your ads</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-muted rounded-md flex items-center justify-center text-muted-foreground mb-4">
                      Device Chart Placeholder
                    </div>
                    <div className="space-y-2">
                      {[
                        { device: "Mobile", percentage: "62%" },
                        { device: "Desktop", percentage: "31%" },
                        { device: "Tablet", percentage: "7%" },
                      ].map((device, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="text-sm">{device.device}</div>
                          <div className="text-sm font-medium">{device.percentage}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Browser Distribution</CardTitle>
                    <CardDescription>Browsers used to view your ads</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-muted rounded-md flex items-center justify-center text-muted-foreground mb-4">
                      Browser Chart Placeholder
                    </div>
                    <div className="space-y-2">
                      {[
                        { browser: "Chrome", percentage: "58%" },
                        { browser: "Safari", percentage: "24%" },
                        { browser: "Firefox", percentage: "8%" },
                        { browser: "Edge", percentage: "7%" },
                        { browser: "Other", percentage: "3%" },
                      ].map((browser, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="text-sm">{browser.browser}</div>
                          <div className="text-sm font-medium">{browser.percentage}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance by Device</CardTitle>
                  <CardDescription>Compare how your ads perform across different devices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-5 p-4 font-medium border-b">
                      <div>Device</div>
                      <div>Impressions</div>
                      <div>Clicks</div>
                      <div>CTR</div>
                      <div>Avg. Time on Page</div>
                    </div>

                    {[
                      { device: "Mobile", impressions: "77,232", clicks: "2,394", ctr: "3.1%", time: "42s" },
                      { device: "Desktop", impressions: "38,616", clicks: "1,352", ctr: "3.5%", time: "1m 18s" },
                      { device: "Tablet", impressions: "8,720", clicks: "289", ctr: "3.3%", time: "58s" },
                    ].map((device, index) => (
                      <div key={index} className="grid grid-cols-5 p-4 border-b last:border-0">
                        <div className="font-medium">{device.device}</div>
                        <div>{device.impressions}</div>
                        <div>{device.clicks}</div>
                        <div>{device.ctr}</div>
                        <div>{device.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

