"use client";
import BackButton from "../../../components/ui/backbutton";
import NutritionClient from "./nutritionClient";

export default function NutritionPage() {
    return (
        <div className="min-h-screen p-6 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                    <BackButton />
                    <h1 className="text-zinc-400 text-lg">
                        Meal plans / <span className="text-white font-semibold">Nutrition Tracker</span>
                    </h1>
                </div>

                <NutritionClient />
            </div>
        </div>
    );
}