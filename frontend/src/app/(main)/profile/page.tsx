"use client";
import { useEffect, useState } from "react";
import BackButton from "../../../components/ui/backbutton";
import { jwtDecode } from "jwt-decode";
import { User, Target, Lock, Save, Loader2 } from 'lucide-react';
import { getUser } from "../../api/authService";

interface DecodedToken {
    id: number;
    username: string;
    role: string;
    email?: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<DecodedToken | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [caloricGoal, setCaloricGoal] = useState('');
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const user = getUser();
        const token = user?.token;
        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                console.log(decoded);
                setUser(decoded);
                setCaloricGoal('2000');
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
        setLoading(false);
    }, []);

    const handleSaveCaloricGoal = async () => {
    };

    const handlePasswordChange = async () => {
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <BackButton />
                

                <div className="mb-12 mt-6">
                    <h1 className="text-3xl font-semibold mb-2">Settings</h1>
                    <p className="text-gray-400">Manage your account settings and preferences</p>
                </div>

                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-medium">Profile</h2>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Name
                            </label>
                            {user?.username}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Email
                            </label>
                                {user?.email}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Role
                            </label>
                                {user?.role}
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center">
                            <Target className="w-5 h-5 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-medium">Nutrition Goals</h2>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Daily Caloric Goal (kcal)
                            </label>
                            <input
                                type="number"
                                value={caloricGoal}
                                onChange={(e) => setCaloricGoal(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-zinc-600 transition-colors"
                                placeholder="2000"
                            />
                            <p className="mt-2 text-sm text-gray-500">
                                Set your daily caloric intake target to track your nutrition goals
                            </p>
                        </div>

                        <button
                            onClick={handleSaveCaloricGoal}
                            disabled={saving}
                            className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Save Goal
                        </button>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-medium">Password</h2>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-zinc-600 transition-colors"
                                placeholder="Enter current password"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-zinc-600 transition-colors"
                                placeholder="Enter new password"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-zinc-600 transition-colors"
                                placeholder="Confirm new password"
                            />
                        </div>

                        <button
                            onClick={handlePasswordChange}
                            disabled={saving || !passwordData.currentPassword || !passwordData.newPassword}
                            className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Lock className="w-4 h-4" />
                            )}
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}