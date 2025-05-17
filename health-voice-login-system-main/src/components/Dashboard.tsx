
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Info, Calendar, Clock, Bell, User, Shield } from "lucide-react";

const Dashboard = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-healthcare-blue">HealthVoice Portal</h1>
          <p className="text-gray-500">{currentDate}</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <User size={16} />
          <span>Dr. Sarah Johnson</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar size={18} className="text-healthcare-blue" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription>Today's schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">John Smith</p>
                  <p className="text-sm text-muted-foreground">Annual Checkup</p>
                </div>
                <span className="text-sm font-medium">09:30 AM</span>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Emily Chen</p>
                  <p className="text-sm text-muted-foreground">Follow-up</p>
                </div>
                <span className="text-sm font-medium">11:00 AM</span>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Robert Davis</p>
                  <p className="text-sm text-muted-foreground">Consultation</p>
                </div>
                <span className="text-sm font-medium">02:15 PM</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell size={18} className="text-healthcare-blue" />
              Recent Notifications
            </CardTitle>
            <CardDescription>System updates and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check size={16} className="mt-0.5 text-green-500" />
                <div>
                  <p className="text-sm">Lab results uploaded for patient #38291</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Info size={16} className="mt-0.5 text-blue-500" />
                <div>
                  <p className="text-sm">Staff meeting scheduled for 4PM in Room 305</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 text-amber-500" />
                <div>
                  <p className="text-sm">Prescription renewal request from M. Thompson</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield size={18} className="text-healthcare-blue" />
              Security Status
            </CardTitle>
            <CardDescription>System protection report</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Voice Authentication</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Multi-Factor Auth</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Last Login</span>
                  <span className="text-xs text-healthcare-blue">Just now</span>
                </div>
                <p className="text-xs text-muted-foreground">Voice biometrics verified with 98.2% confidence</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-healthcare-bg-blue p-4 rounded-lg">
        <h2 className="font-bold text-healthcare-blue mb-2">Recent Patient Activity</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-2 font-medium">Patient</th>
                <th className="pb-2 font-medium">Action</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3">Michael Thompson</td>
                <td className="py-3">Prescription Renewal</td>
                <td className="py-3">May 16, 2025</td>
                <td className="py-3"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs">Pending</span></td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3">Emma Wilson</td>
                <td className="py-3">Lab Results</td>
                <td className="py-3">May 15, 2025</td>
                <td className="py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">Completed</span></td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3">David Johnson</td>
                <td className="py-3">Appointment Request</td>
                <td className="py-3">May 15, 2025</td>
                <td className="py-3"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">Confirmed</span></td>
              </tr>
              <tr>
                <td className="py-3">Sophia Lee</td>
                <td className="py-3">Medical Records Update</td>
                <td className="py-3">May 14, 2025</td>
                <td className="py-3"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Processed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
