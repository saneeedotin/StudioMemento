"use client";

import { useState, useTransition } from "react";
import { cancelAppointment, blockSlot, unblockSlot } from "@/app/actions";
import { useRouter } from "next/navigation";

type Appointment = {
  id: string;
  date: string;
  slot: string;
  name: string;
  phone: string;
  email: string | null;
  notes: string | null;
  createdAt: Date;
};

type BlockedSlot = {
  id: string;
  date: string;
  slot: string | null;
  reason: string | null;
  createdAt: Date;
};

export default function AdminBookingList({ 
  appointments, 
  blockedSlots 
}: { 
  appointments: Appointment[];
  blockedSlots: BlockedSlot[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"upcoming" | "blocked">("upcoming");
  const [search, setSearch] = useState("");

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      startTransition(async () => {
        await cancelAppointment(id);
        router.refresh();
      });
    }
  };

  const handleBlockDay = () => {
    const date = prompt("Enter date to block (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);
    if (!date) return;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      alert("Invalid date format. Use YYYY-MM-DD.");
      return;
    }
    const reason = prompt("Reason for blocking this day? (Optional)");
    startTransition(async () => {
      await blockSlot(date, undefined, reason || undefined);
      alert(`Day ${date} has been blocked.`);
      router.refresh();
      setActiveTab("blocked");
    });
  };

  const handleUnblock = (id: string) => {
    if (confirm("Are you sure you want to unblock this?")) {
      startTransition(async () => {
        await unblockSlot(id);
        router.refresh();
      });
    }
  };

  const downloadCSV = () => {
    const headers = ["Date", "Time", "Name", "Phone", "Email", "Notes"];
    const rows = appointments.map(apt => [
      apt.date, 
      apt.slot, 
      `"${apt.name.replace(/"/g, '""')}"`, 
      apt.phone, 
      apt.email || "", 
      `"${(apt.notes || "").replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `memento_appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAppointments = appointments.filter(apt => 
    apt.name.toLowerCase().includes(search.toLowerCase()) || 
    apt.date.includes(search) || 
    (apt.email && apt.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#043c74]/60">Upcoming Bookings</p>
            <h3 className="text-4xl font-display font-bold text-[#043c74] mt-2">{appointments.length}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-[#fecbd7]/30 flex items-center justify-center text-[#043c74]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
        </div>
        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#043c74]/60">Blocked Days</p>
            <h3 className="text-4xl font-display font-bold text-[#043c74] mt-2">{blockedSlots.length}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#043c74] to-[#0a5a9c] rounded-[1.5rem] p-6 shadow-md text-white flex flex-col justify-between items-start">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Quick Actions</p>
          <div className="flex gap-3 w-full mt-4">
            <button onClick={handleBlockDay} disabled={isPending} className="flex-1 rounded-full bg-white/20 hover:bg-white/30 py-2 text-xs font-bold uppercase tracking-widest transition-colors">
              Block Day
            </button>
            <button onClick={downloadCSV} className="flex-1 rounded-full bg-white text-[#043c74] hover:bg-gray-100 py-2 text-xs font-bold uppercase tracking-widest transition-colors">
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex bg-gray-200 rounded-full p-1">
          <button 
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "upcoming" ? "bg-white text-[#043c74] shadow-sm" : "text-gray-500 hover:text-[#043c74]"}`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setActiveTab("blocked")}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "blocked" ? "bg-white text-[#043c74] shadow-sm" : "text-gray-500 hover:text-[#043c74]"}`}
          >
            Blocked Dates
          </button>
        </div>

        {activeTab === "upcoming" && (
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search name, email, date..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#043c74]"
            />
            <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        )}
      </div>

      {/* Main Table Content */}
      <div className="rounded-[1.5rem] bg-white shadow-sm border border-gray-100">
        
        {activeTab === "upcoming" ? (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-[#043c74]">
                <thead className="bg-gray-50/80 uppercase tracking-widest text-[10px] text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-bold">Date & Time</th>
                    <th className="px-6 py-4 font-bold">Client Name</th>
                    <th className="px-6 py-4 font-bold">Contact</th>
                    <th className="px-6 py-4 font-bold">Notes</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                        No matching appointments found.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="transition-colors hover:bg-gray-50/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold">{apt.date}</div>
                          <div className="opacity-70 text-xs mt-0.5">{apt.slot}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold">{apt.name}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">{apt.phone}</div>
                          <div className="opacity-60 text-xs mt-0.5">{apt.email || "—"}</div>
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate text-xs opacity-80">
                          {apt.notes || "—"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            disabled={isPending}
                            onClick={() => handleCancel(apt.id)}
                            className="text-[10px] font-bold text-red-500 uppercase tracking-widest border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 disabled:opacity-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col divide-y divide-gray-100">
              {filteredAppointments.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm">
                  No matching appointments found.
                </div>
              ) : (
                filteredAppointments.map((apt) => (
                  <div key={apt.id} className="p-5 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-[#043c74]">{apt.name}</span>
                        <div className="text-xs text-[#043c74]/70 font-medium mt-1">
                          {apt.date} at {apt.slot}
                        </div>
                      </div>
                      <button
                        disabled={isPending}
                        onClick={() => handleCancel(apt.id)}
                        className="text-[9px] font-bold text-red-500 uppercase tracking-widest border border-red-200 rounded-md px-2.5 py-1.5 hover:bg-red-50 disabled:opacity-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-[#043c74]/80">
                      <div>
                        <span className="block text-[9px] uppercase tracking-widest opacity-60 font-bold mb-0.5">Phone</span>
                        {apt.phone}
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-widest opacity-60 font-bold mb-0.5">Email</span>
                        <span className="truncate block">{apt.email || "—"}</span>
                      </div>
                    </div>
                    
                    {apt.notes && (
                      <div className="text-xs text-[#043c74]/80 bg-gray-50 p-2 rounded-md">
                        <span className="block text-[9px] uppercase tracking-widest opacity-60 font-bold mb-1">Notes</span>
                        {apt.notes}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-[#043c74]">
                <thead className="bg-gray-50/80 uppercase tracking-widest text-[10px] text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-bold">Date Blocked</th>
                    <th className="px-6 py-4 font-bold">Reason</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {blockedSlots.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-gray-400">
                        No blocked dates found.
                      </td>
                    </tr>
                  ) : (
                    blockedSlots.map((block) => (
                      <tr key={block.id} className="transition-colors hover:bg-gray-50/50">
                        <td className="px-6 py-4 whitespace-nowrap font-bold">
                          {block.date} {block.slot ? `(${block.slot})` : "(Whole Day)"}
                        </td>
                        <td className="px-6 py-4 text-xs opacity-80">
                          {block.reason || "Manual Block"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            disabled={isPending}
                            onClick={() => handleUnblock(block.id)}
                            className="text-[10px] font-bold text-green-600 uppercase tracking-widest border border-green-200 rounded-lg px-3 py-1.5 hover:bg-green-50 disabled:opacity-50 transition-colors"
                          >
                            Unblock
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col divide-y divide-gray-100">
              {blockedSlots.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm">
                  No blocked dates found.
                </div>
              ) : (
                blockedSlots.map((block) => (
                  <div key={block.id} className="p-5 flex justify-between items-center gap-4">
                    <div>
                      <div className="font-bold text-[#043c74] text-sm">
                        {block.date} {block.slot ? `(${block.slot})` : "(Whole Day)"}
                      </div>
                      <div className="text-[10px] text-[#043c74]/60 uppercase tracking-widest font-semibold mt-1">
                        {block.reason || "Manual Block"}
                      </div>
                    </div>
                    <button
                      disabled={isPending}
                      onClick={() => handleUnblock(block.id)}
                      className="text-[9px] font-bold text-green-600 uppercase tracking-widest border border-green-200 rounded-md px-2.5 py-1.5 hover:bg-green-50 disabled:opacity-50 transition-colors whitespace-nowrap"
                    >
                      Unblock
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
