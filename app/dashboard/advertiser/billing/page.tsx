import { SiteHeader } from "@/components/site-header"
import { AdvertiserSidebar } from "@/components/advertiser-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Download, Plus } from "lucide-react"

export default function AdvertiserBillingPage() {
  return (
    <div className="flex min-h-screen flex-col">
    

      <div className="flex-1 flex">
        <AdvertiserSidebar />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Billing & Payments</h1>

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,450.00</div>
                <p className="text-xs text-muted-foreground">Available for campaigns</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,245.50</div>
                <p className="text-xs text-muted-foreground">This billing cycle</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Next Invoice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$850.00</div>
                <p className="text-xs text-muted-foreground">Due on May 1, 2023</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="invoices" className="space-y-4">
            <TabsList>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
              <TabsTrigger value="billing-plan">Billing Plan</TabsTrigger>
            </TabsList>

            <TabsContent value="invoices" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Invoice History</CardTitle>
                  <CardDescription>View and download your past invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-5 p-4 font-medium border-b">
                      <div>Invoice #</div>
                      <div>Date</div>
                      <div>Amount</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>

                    {[
                      { id: "INV-2023-042", date: "Apr 1, 2023", amount: "$1,245.50", status: "Paid" },
                      { id: "INV-2023-031", date: "Mar 1, 2023", amount: "$1,120.75", status: "Paid" },
                      { id: "INV-2023-022", date: "Feb 1, 2023", amount: "$980.25", status: "Paid" },
                      { id: "INV-2023-011", date: "Jan 1, 2023", amount: "$850.00", status: "Paid" },
                      { id: "INV-2022-122", date: "Dec 1, 2022", amount: "$750.50", status: "Paid" },
                    ].map((invoice, index) => (
                      <div key={index} className="grid grid-cols-5 p-4 border-b last:border-0">
                        <div className="font-medium">{invoice.id}</div>
                        <div>{invoice.date}</div>
                        <div>{invoice.amount}</div>
                        <div>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            {invoice.status}
                          </span>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Spending</CardTitle>
                  <CardDescription>Breakdown of spending by campaign</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-muted rounded-md flex items-center justify-center text-muted-foreground mb-4">
                    Spending Chart Placeholder
                  </div>

                  <div className="border rounded-md">
                    <div className="grid grid-cols-4 p-4 font-medium border-b">
                      <div>Campaign</div>
                      <div>Start Date</div>
                      <div>Budget</div>
                      <div>Spent</div>
                    </div>

                    {[
                      { name: "Summer Sale", date: "Mar 15, 2023", budget: "$2,000.00", spent: "$845.50" },
                      { name: "Product Launch", date: "Mar 22, 2023", budget: "$1,500.00", spent: "$400.00" },
                      { name: "Brand Awareness", date: "Apr 1, 2023", budget: "$1,000.00", spent: "$0.00" },
                    ].map((campaign, index) => (
                      <div key={index} className="grid grid-cols-4 p-4 border-b last:border-0">
                        <div className="font-medium">{campaign.name}</div>
                        <div>{campaign.date}</div>
                        <div>{campaign.budget}</div>
                        <div>{campaign.spent}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment-methods" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>Manage your payment methods</CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: "Visa", last4: "4242", expiry: "12/25", default: true },
                      { type: "Mastercard", last4: "5555", expiry: "08/24", default: false },
                    ].map((card, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center">
                          <div className="w-10 h-6 bg-muted rounded mr-4 flex items-center justify-center">
                            <CreditCard className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {card.type} ending in {card.last4}
                              {card.default && (
                                <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">Expires {card.expiry}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!card.default && (
                            <Button variant="outline" size="sm">
                              Set as Default
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          {!card.default && (
                            <Button variant="outline" size="sm">
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                  <CardDescription>Your billing address for invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border rounded-md">
                    <div className="font-medium mb-2">Acme Inc.</div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>123 Business Street</p>
                      <p>Suite 456</p>
                      <p>New York, NY 10001</p>
                      <p>United States</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      Edit Address
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing-plan" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Your current advertising plan and usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-6 border rounded-md">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <div className="text-2xl font-bold">Premium Advertiser</div>
                        <div className="text-sm text-muted-foreground">$500/month base fee + usage</div>
                      </div>
                      <Button>Upgrade Plan</Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm font-medium">Monthly Impressions</div>
                          <div className="text-sm">124,568 / 150,000</div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "83%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm font-medium">Active Campaigns</div>
                          <div className="text-sm">3 / 5</div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "60%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm font-medium">Premium Placements</div>
                          <div className="text-sm">1 / 2</div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "50%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Plans</CardTitle>
                  <CardDescription>Compare advertising plans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      {
                        name: "Basic",
                        price: "$200",
                        features: [
                          "50,000 monthly impressions",
                          "2 active campaigns",
                          "Standard placements only",
                          "Basic analytics",
                          "Email support",
                        ],
                      },
                      {
                        name: "Premium",
                        price: "$500",
                        current: true,
                        features: [
                          "150,000 monthly impressions",
                          "5 active campaigns",
                          "Premium placements included",
                          "Advanced analytics",
                          "Priority support",
                        ],
                      },
                      {
                        name: "Enterprise",
                        price: "$1,200",
                        features: [
                          "500,000 monthly impressions",
                          "Unlimited campaigns",
                          "Premium placements included",
                          "Custom reporting",
                          "Dedicated account manager",
                        ],
                      },
                    ].map((plan, index) => (
                      <Card key={index} className={plan.current ? "border-primary" : ""}>
                        <CardHeader>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>
                            {plan.price}/month
                            {plan.current && (
                              <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-primary text-primary-foreground">
                                Current Plan
                              </span>
                            )}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="h-4 w-4 mr-2 text-green-600"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Button variant={plan.current ? "outline" : "default"} className="w-full mt-4">
                            {plan.current ? "Current Plan" : "Upgrade"}
                          </Button>
                        </CardContent>
                      </Card>
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

