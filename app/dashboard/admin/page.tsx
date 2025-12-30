"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, BadgePercent, ShieldCheck, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { ProtectedRoute } from "@/components/protected-route";

interface User {
  _id: string;
  fullName: string;
  companyName: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'ADVERTISER';
}

interface CampaignAnalytics {
  impressions: number;
  clicks: number;
  ctr: number;
}

interface CampaignAdvertiser {
  _id: string;
  fullName: string;
  companyName: string;
}

interface Campaign {
  _id: string;
  advertiser: CampaignAdvertiser;
  campaignName: string;
  campaignType: 'FEATURED' | string;
  headline: string;
  body: string;
  callToAction: string;
  imageUrl: string;
  status: 'ACTIVE' | 'PENDING';
  analytics: CampaignAnalytics;
}

function CampaignDetailsModal({ 
  campaign, 
  isOpen, 
  onClose 
}: { 
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!campaign) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Campaign Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={campaign.imageUrl}
                alt={campaign.headline}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">Analytics</h3>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Impressions</div>
                  <div className="font-semibold">{campaign.analytics.impressions}</div>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Clicks</div>
                  <div className="font-semibold">{campaign.analytics.clicks}</div>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">CTR</div>
                  <div className="font-semibold">{campaign.analytics.ctr}%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Campaign Information</h3>
              <div className="mt-2 space-y-2">
                <div>
                  <div className="text-sm text-gray-500">Campaign Name</div>
                  <div>{campaign.campaignName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Type</div>
                  <div>{campaign.campaignType}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div className={campaign.status === 'ACTIVE' ? 'text-green-600' : 'text-yellow-600'}>
                    {campaign.status}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Content</h3>
              <div className="mt-2 space-y-2">
                <div>
                  <div className="text-sm text-gray-500">Headline</div>
                  <div>{campaign.headline}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Body</div>
                  <div className="text-sm">{campaign.body}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Call to Action</div>
                  <div>{campaign.callToAction}</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Advertiser</h3>
              <div className="mt-2 space-y-2">
                <div>
                  <div className="text-sm text-gray-500">Company</div>
                  <div>{campaign.advertiser.companyName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Contact Person</div>
                  <div>{campaign.advertiser.fullName}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [advertiserCount, setAdvertiserCount] = useState(0);
  const [campaignCount, setCampaignCount] = useState(0);
  const [activeCampaigns, setActiveCampaigns] = useState(0);
  const [pendingCampaigns, setPendingCampaigns] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [advertisers, setAdvertisers] = useState<User[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [advertiserCurrentPage, setAdvertiserCurrentPage] = useState(1);
  const [campaignCurrentPage, setCampaignCurrentPage] = useState(1);
  const [loadingStatus, setLoadingStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const usersPerPage = 10;
  const advertisersPerPage = 10;
  const campaignsPerPage = 10;
  const token = useSelector((state: RootState) => state.auth.token);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch('https://advertisemedia.onrender.com/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          cache: 'no-store', // Prevent caching to ensure fresh data
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const usersArray = Array.isArray(responseData) ? responseData : 
                          Array.isArray(responseData.users) ? responseData.users : [];
        
        const validUsers = usersArray.filter((user: { _id: any; fullName: any; email: any; role: any; }): user is User => {
          return user && 
                 typeof user._id === 'string' &&
                 typeof user.fullName === 'string' &&
                 typeof user.email === 'string' &&
                 typeof user.role === 'string';
        });
        
        const filteredUsers = validUsers.filter((user: { role: string; }) => user.role === 'USER');
        const filteredAdvertisers = validUsers.filter((user: { role: string; }) => user.role === 'ADVERTISER');

        setUsers(filteredUsers);
        setAdvertisers(filteredAdvertisers);
        setUserCount(filteredUsers.length);
        setAdvertiserCount(filteredAdvertisers.length);
        
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
        setAdvertisers([]);
        setUserCount(0);
        setAdvertiserCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [token, refreshKey]); // Added refreshKey as a dependency

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch("https://advertisemedia.onrender.com/api/campaigns",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            }
          }  
        );
        const data = await response.json();
        const campaignsData = Array.isArray(data) ? data : data.campaigns || [];
        console.log("Campaigns Data:", campaignsData);
        const activeCampaigns = campaignsData.filter((campaign: Campaign) => campaign.status === "ACTIVE");
        const pendingCampaigns = campaignsData.filter((campaign: Campaign) => campaign.status === "PENDING");
        
        setCampaigns(campaignsData);
        setCampaignCount(campaignsData.length);
        setActiveCampaigns(activeCampaigns.length);
        setPendingCampaigns(pendingCampaigns.length);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchAdvertisements();
  }, [token]);

  // Get current users
  const getCurrentUsers = () => {
    // Sort users by _id in descending order (assuming _id contains timestamp)
    const sortedUsers = [...users].sort((a, b) => b._id.localeCompare(a._id));
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  };

  // Get current advertisers
  const getCurrentAdvertisers = () => {
    const sortedAdvertisers = [...advertisers].sort((a, b) => b._id.localeCompare(a._id));
    const indexOfLastAdvertiser = advertiserCurrentPage * advertisersPerPage;
    const indexOfFirstAdvertiser = indexOfLastAdvertiser - advertisersPerPage;
    return sortedAdvertisers.slice(indexOfFirstAdvertiser, indexOfLastAdvertiser);
  };

  // Get current campaigns
  const getCurrentCampaigns = () => {
    const sortedCampaigns = [...campaigns].sort((a, b) => b._id.localeCompare(a._id));
    const indexOfLastCampaign = campaignCurrentPage * campaignsPerPage;
    const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
    return sortedCampaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);
  };

  const totalPages = Math.ceil(users.length / usersPerPage);
  const totalAdvertiserPages = Math.ceil(advertisers.length / advertisersPerPage);
  const totalCampaignPages = Math.ceil(campaigns.length / campaignsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextAdvertiserPage = () => {
    if (advertiserCurrentPage < totalAdvertiserPages) {
      setAdvertiserCurrentPage(advertiserCurrentPage + 1);
    }
  };

  const handlePreviousAdvertiserPage = () => {
    if (advertiserCurrentPage > 1) {
      setAdvertiserCurrentPage(advertiserCurrentPage - 1);
    }
  };

  const handleNextCampaignPage = () => {
    if (campaignCurrentPage < totalCampaignPages) {
      setCampaignCurrentPage(campaignCurrentPage + 1);
    }
  };

  const handlePreviousCampaignPage = () => {
    if (campaignCurrentPage > 1) {
      setCampaignCurrentPage(campaignCurrentPage - 1);
    }
  };

  const handleStatusUpdate = async (campaignId: string, currentStatus: string) => {
    setLoadingStatus(campaignId);
    console.log(campaignId, currentStatus);
    try {
      const newStatus = currentStatus === 'PENDING' ? 'ACTIVE' : 'PENDING';
      const response = await fetch(`https://advertisemedia.onrender.com/api/campaigns/${campaignId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update campaign status');
      }

      // Update campaign status in state and recalculate counts
      const updatedStatus = newStatus as 'ACTIVE' | 'PENDING';
      setCampaigns(prevCampaigns => {
        const updatedCampaigns = prevCampaigns.map(campaign => 
          campaign._id === campaignId ? { ...campaign, status: updatedStatus } : campaign
        );

        // Update counts separately to ensure they're calculated after state update
        const activeCount = updatedCampaigns.filter(c => c.status === 'ACTIVE').length;
        const pendingCount = updatedCampaigns.filter(c => c.status === 'PENDING').length;
        
        // Schedule count updates for next tick to ensure campaign state is updated first
        setTimeout(() => {
          setActiveCampaigns(activeCount);
          setPendingCampaigns(pendingCount);
        }, 0);
        
        return updatedCampaigns;
      });
    } catch (error) {
      console.error('Error updating campaign status:', error);
    } finally {
      setLoadingStatus(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`https://advertisemedia.onrender.com/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove user from state
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      setUserCount(prev => prev - 1);

    } catch (error) {
      console.error('Error deleting user:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 flex">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Admin Dashboard</h1>
          
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 mb-4 md:mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <UserRound className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userCount}</div>
                <p className="text-xs text-muted-foreground">Total registered users</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Advertisers</CardTitle>
                <BadgePercent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{advertiserCount}</div>
                <p className="text-xs text-muted-foreground">Total registered advertisers</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeCampaigns}</div>
                <p className="text-xs text-muted-foreground">{pendingCampaigns} pending campaigns</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users" className="space-y-4">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="advertisers">Advertisers</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>View and manage all registered users on the platform.</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setRefreshKey(prev => prev + 1)}
                    className={`${isLoading ? 'animate-spin' : ''}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                      <path d="M21 3v5h-5" />
                    </svg>
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="border rounded-md">
                        <div className="grid grid-cols-2 md:gap-24 md:grid-cols-4 py-4 px-4 md:px-8 font-medium border-b">
                          <div>Name</div>
                          <div className="hidden md:block">Email</div>
                          <div className="hidden md:block">Company</div>
                          <div>Actions</div>
                        </div>
                        {getCurrentUsers().map((user) => (
                          <div key={user._id} className="grid grid-cols-2 md:gap-24 md:grid-cols-4 py-4 px-4 border-b last:border-0">
                            <div>
                              <div>{user.fullName}</div>
                              <div className="text-sm text-muted-foreground md:hidden">{user.email}</div>
                              <div className="text-sm text-muted-foreground md:hidden">{user.companyName}</div>
                            </div>
                            <div className="hidden md:block">{user.email}</div>
                            <div className="hidden md:block">{user.companyName}</div>
                            <div className="flex gap-2">
                              
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteUser(user._id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                          Showing {Math.min(currentPage * usersPerPage, users.length)} of {users.length} users
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                          </Button>
                          <div className="text-sm">
                            Page {currentPage} of {totalPages}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                          >
                            Next
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advertisers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Advertiser Management</CardTitle>
                  <CardDescription>View and manage all advertisers on the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="border rounded-md">
                        <div className="grid grid-cols-4 p-4 font-medium border-b">
                          <div>Name</div>
                          <div>Company</div>
                          <div className="hidden md:flex">Email</div>
                          <div>Actions</div>
                        </div>
                        {getCurrentAdvertisers().map((advertiser) => (
                          <div key={advertiser._id} className="grid grid-cols-4 p-4 border-b last:border-0">
                            <div>{advertiser.fullName}</div>
                            <div >{advertiser.companyName}</div>
                            <div className="hidden md:flex">{advertiser.email}</div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm">Suspend</Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                          Showing {Math.min(advertiserCurrentPage * advertisersPerPage, advertisers.length)} of {advertisers.length} advertisers
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAdvertiserCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={advertiserCurrentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                          </Button>
                          <div className="text-sm">
                            Page {advertiserCurrentPage} of {totalAdvertiserPages}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAdvertiserCurrentPage(prev => Math.min(totalAdvertiserPages, prev + 1))}
                            disabled={advertiserCurrentPage === totalAdvertiserPages}
                          >
                            Next
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Management</CardTitle>
                  <CardDescription>View and manage all advertising campaigns.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-3 md:grid-cols-6 px-4 md:px-8 py-4 font-medium border-b">
                      <div>Campaign</div>
                      <div className="hidden md:block">Advertiser</div>
                      <div className="hidden md:block">Type</div>
                      <div>Status</div>
                      <div className="hidden md:block">Performance</div>
                      <div>Actions</div>
                    </div>
                    {getCurrentCampaigns().map((campaign) => (
                      <div key={campaign._id} className="grid grid-cols-3 md:grid-cols-6 px-4 md:px-8 py-4 border-b last:border-0">
                        <div>
                          <div className="font-medium">{campaign.campaignName}</div>
                          <div className="text-sm text-muted-foreground md:hidden">{campaign.advertiser.companyName}</div>
                          <div className="text-sm text-muted-foreground md:hidden">{campaign.campaignType}</div>
                        </div>
                        <div className="hidden md:block">
                          <div className="font-medium">{campaign.advertiser.companyName}</div>
                          <div className="text-sm text-muted-foreground">{campaign.advertiser.fullName}</div>
                        </div>
                        <div className="hidden md:block">{campaign.campaignType}</div>
                        <div className={campaign.status === 'ACTIVE' ? 'text-green-600' : 'text-yellow-600'}>
                          {campaign.status}
                        </div>
                        <div className="hidden md:block">
                          <div className="text-sm">Clicks: {campaign.analytics.clicks}</div>
                          <div className="text-sm">CTR: {campaign.analytics.ctr}%</div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedCampaign(campaign);
                              setIsModalOpen(true);
                            }}
                          >
                            View
                          </Button>
                          <Button
                            variant={campaign.status === 'PENDING' ? 'default' : 'outline'}
                            onClick={() => handleStatusUpdate(campaign._id, campaign.status)}
                            size="sm"
                            disabled={loadingStatus === campaign._id}
                          >
                            {loadingStatus === campaign._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : campaign.status === 'PENDING' ? (
                              'Approve'
                            ) : (
                              'Pause'
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Showing {Math.min(campaignCurrentPage * campaignsPerPage, campaigns.length)} of {campaigns.length} campaigns
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCampaignCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={campaignCurrentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <div className="text-sm">
                        Page {campaignCurrentPage} of {totalCampaignPages}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCampaignCurrentPage(prev => Math.min(totalCampaignPages, prev + 1))}
                        disabled={campaignCurrentPage === totalCampaignPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Track revenue from advertising campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-muted rounded-md flex items-center justify-center text-muted-foreground mb-6">
                    Revenue Chart Placeholder
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Monthly Revenue</div>
                        <div className="text-2xl font-bold">$45,231</div>
                        <div className="text-xs text-green-600">+12% from last month</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Quarterly Revenue</div>
                        <div className="text-2xl font-bold">$142,568</div>
                        <div className="text-xs text-green-600">+8% from last quarter</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Annual Projection</div>
                        <div className="text-2xl font-bold">$580,000</div>
                        <div className="text-xs text-green-600">+15% from last year</div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

      {/* Campaign Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={() => {
        setIsModalOpen(false);
        setSelectedCampaign(null);
      }}>
        <DialogContent className="max-w-[95vw] md:max-w-2xl bg-white max-h-[90vh] overflow-y-auto p-4 md:p-6">
          {selectedCampaign && (
            <>
              <DialogHeader className="top-0 z-10">
                <DialogTitle className="text-xl md:text-2xl">Campaign Details</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={selectedCampaign.imageUrl}
                      alt={selectedCampaign.headline}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">Analytics</h3>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Impressions</div>
                        <div className="font-semibold">{selectedCampaign.analytics.impressions}</div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Clicks</div>
                        <div className="font-semibold">{selectedCampaign.analytics.clicks}</div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">CTR</div>
                        <div className="font-semibold">{selectedCampaign.analytics.ctr}%</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Campaign Information</h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <div className="text-sm text-gray-500">Campaign Name</div>
                        <div>{selectedCampaign.campaignName}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Type</div>
                        <div>{selectedCampaign.campaignType}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Status</div>
                        <div className={selectedCampaign.status === 'ACTIVE' ? 'text-green-600' : 'text-yellow-600'}>
                          {selectedCampaign.status}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Content</h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <div className="text-sm text-gray-500">Headline</div>
                        <div>{selectedCampaign.headline}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Body</div>
                        <div className="text-sm">{selectedCampaign.body}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Call to Action</div>
                        <div>{selectedCampaign.callToAction}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Advertiser</h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <div className="text-sm text-gray-500">Company</div>
                        <div>{selectedCampaign.advertiser.companyName}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Contact Person</div>
                        <div>{selectedCampaign.advertiser.fullName}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      </div>
    </div>
    </ProtectedRoute>
  );
}

