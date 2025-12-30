"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserSidebar } from "@/components/user-sidebar"
import { ProtectedRoute } from "@/components/protected-route"

export default function UserDashboard() {
  return (
    <ProtectedRoute allowedRoles={["USER"]}>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1 flex">
          <UserSidebar />

          <main className="flex-1 p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome, User!</h1>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                    <CardDescription>Manage your personal information and preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Name</div>
                          <div>John Doe</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Email</div>
                          <div>john.doe@example.com</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Member Since</div>
                          <div>{new Date().toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Account Type</div>
                          <div>User</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Email Notifications</div>
                          <div className="text-sm text-muted-foreground">Receive updates via email</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Push Notifications</div>
                          <div className="text-sm text-muted-foreground">Receive updates on your device</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Featured Advertisements</CardTitle>
                    <CardDescription>Advertisements tailored to your interests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((id) => (
                        <div key={id} className="border rounded-md p-4">
                          <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center text-muted-foreground">
                            Advertisement {id}
                          </div>
                          <div className="font-medium">Special Offer #{id}</div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Check out this amazing deal from our partners!
                          </div>
                          <Button variant="outline" size="sm">
                            Learn More
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Reading History</CardTitle>
                    <CardDescription>Articles you've recently read</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((id) => (
                        <div key={id} className="flex justify-between border-b pb-2 last:border-0 last:pb-0">
                          <div>
                            <div className="font-medium">
                              {["Business News", "Technology Update", "Local Events", "Opinion Piece"][id - 1]}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(Date.now() - id * 86400000).toLocaleDateString()}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Read Again
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

