import { cookies } from "next/headers";
import { Coffee, UtensilsCrossed, Apple, SquareX, Flame, Droplet, Wheat, Beef } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import Meal from "../../../types/types";
import BackButton from "../../../components/ui/backbutton";
import AddMealModal from "../../../components/sections/AddMealModal";

const MacroDisplay = ({ label, value, color, icon }: { label: string, value: number, color: string, icon: React.ReactNode }) => (
    <div className="flex flex-col items-center gap-1">
        <div className={`w-10 h-10 rounded-full ${color} bg-opacity-20 flex items-center justify-center`}>
            {icon}
        </div>
        <div className="text-center">
            <p className="text-white font-bold text-sm">{value}g</p>
            <p className="text-zinc-500 text-[10px] uppercase tracking-wider">{label}</p>
        </div>
    </div>
);

const MealCard = ({ meal }: { meal: Meal }) => {
    const categoryIcons: any = {
        breakfast: <Coffee className="w-5 h-5" />,
        lunch: <UtensilsCrossed className="w-5 h-5" />,
        dinner: <UtensilsCrossed className="w-5 h-5" />,
        snacks: <Apple className="w-5 h-5" />
    };

    return (
        <div className="bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition-all cursor-pointer border border-zinc-800 hover:border-zinc-700">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                    {meal.image ? (
                        <Image
                            src={meal.image}
                            alt={meal.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                            🍽️
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm truncate">{meal.name}</h3>
                    <p className="text-emerald-400 text-xs font-medium">{meal.calories} kcal</p>
                    <p className="text-zinc-500 text-xs mt-1">
                        P:{meal.protein}g • C:{meal.carbs}g • F:{meal.fats}g
                    </p>
                </div>
                <div className="text-zinc-500">
                    {categoryIcons[meal.category]}
                </div>
                <button><SquareX className="text-red-400 w-5 h-5 hover:text-red-300 transition-colors"/></button>
            </div>
        </div>
    );
};

const CalorieCounter = ({ 
    current, 
    goal = 2000,
    macros 
}: { 
    current: number; 
    goal?: number;
    macros: { protein: number; carbs: number; fats: number } 
}) => {
    const percentage = Math.min((current / goal) * 100, 100);

    return (
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-6">
                <div>
                    <h2 className="text-4xl font-bold text-white">{current} <span className="text-lg font-normal text-zinc-500">kcal</span></h2>
                    <p className="text-zinc-400 text-sm mt-1">Daily Total Intake</p>
                </div>
                
                <div className="flex gap-6 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                    <MacroDisplay 
                        label="Protein" 
                        value={macros.protein} 
                        color="text-blue-500" 
                        icon={<Beef className="w-5 h-5" />}
                    />
                    <MacroDisplay 
                        label="Carbs" 
                        value={macros.carbs} 
                        color="text-amber-500" 
                        icon={<Wheat className="w-5 h-5" />}
                    />
                    <MacroDisplay 
                        label="Fats" 
                        value={macros.fats} 
                        color="text-rose-500" 
                        icon={<Droplet className="w-5 h-5" />}
                    />
                </div>
            </div>

            <div className="relative w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className="flex justify-between mt-2">
                <p className="text-zinc-500 text-xs">{percentage.toFixed(0)}% of daily goal</p>
                <p className="text-zinc-500 text-xs">Goal: {goal} kcal</p>
            </div>
        </div>
    );
};

export default async function NutritionPage() {
    const cookieStore = await cookies();
    const userIdObject = cookieStore.get("userId");
    const userId = userIdObject?.value;

    const data = await fetch(`http://localhost:8000/api/users/${userId}/meals`, { cache: 'no-store' });
    const meals: Meal[] = await data.json();

    const totals = meals.reduce((acc, meal) => ({
        calories: acc.calories + (meal.calories || 0),
        protein: acc.protein + (meal.protein || 0),
        carbs: acc.carbs + (meal.carbs || 0),
        fats: acc.fats + (meal.fats || 0),
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

    const categorizedMeals = {
        breakfast: meals.filter(m => m.category === 'breakfast'),
        lunch: meals.filter(m => m.category === 'lunch'),
        snacks: meals.filter(m => m.category === 'snacks'),
        dinner: meals.filter(m => m.category === 'dinner')
    };

    return (
        <div className="min-h-screen p-6 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                        <BackButton />
                    <h1 className="text-zinc-400 text-lg">
                        Meal plans / <span className="text-white font-semibold">Nutrition Tracker</span>
                    </h1>
                </div>

                <AddMealModal userId={userId} />

                <CalorieCounter 
                    current={totals.calories} 
                    goal={2000} 
                    macros={{
                        protein: totals.protein,
                        carbs: totals.carbs,
                        fats: totals.fats
                    }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {/* Breakfast */}
                    <div>
                        <h3 className="text-zinc-400 text-sm font-medium mb-4 uppercase tracking-wider flex items-center gap-2">
                            <Coffee className="w-4 h-4"/> Breakfast
                        </h3>
                        <div className="space-y-3">
                            {categorizedMeals.breakfast.length > 0 ? (
                                categorizedMeals.breakfast.map(meal => <MealCard key={meal.id} meal={meal} />)
                            ) : (
                                <p className="text-zinc-700 text-sm italic border border-dashed border-zinc-800 rounded-lg p-4 text-center">No breakfast added</p>
                            )}
                        </div>
                    </div>

                    {/* Lunch */}
                    <div>
                        <h3 className="text-zinc-400 text-sm font-medium mb-4 uppercase tracking-wider flex items-center gap-2">
                             <UtensilsCrossed className="w-4 h-4"/> Lunch
                        </h3>
                        <div className="space-y-3">
                            {categorizedMeals.lunch.length > 0 ? (
                                categorizedMeals.lunch.map(meal => <MealCard key={meal.id} meal={meal} />)
                            ) : (
                                <p className="text-zinc-700 text-sm italic border border-dashed border-zinc-800 rounded-lg p-4 text-center">No lunch added</p>
                            )}
                        </div>
                    </div>

                    {/* Snacks */}
                    <div>
                        <h3 className="text-zinc-400 text-sm font-medium mb-4 uppercase tracking-wider flex items-center gap-2">
                             <Apple className="w-4 h-4"/> Snacks
                        </h3>
                        <div className="space-y-3">
                            {categorizedMeals.snacks.length > 0 ? (
                                categorizedMeals.snacks.map(meal => <MealCard key={meal.id} meal={meal} />)
                            ) : (
                                <p className="text-zinc-700 text-sm italic border border-dashed border-zinc-800 rounded-lg p-4 text-center">No snacks added</p>
                            )}
                        </div>
                    </div>

                    {/* Dinner */}
                    <div>
                        <h3 className="text-zinc-400 text-sm font-medium mb-4 uppercase tracking-wider flex items-center gap-2">
                             <Flame className="w-4 h-4"/> Dinner
                        </h3>
                        <div className="space-y-3">
                            <Suspense fallback={<p className="text-zinc-600 text-sm">Loading...</p>}>
                                {categorizedMeals.dinner.length > 0 ? (
                                    categorizedMeals.dinner.map(meal => <MealCard key={meal.id} meal={meal} />)
                                ) : (
                                    <p className="text-zinc-700 text-sm italic border border-dashed border-zinc-800 rounded-lg p-4 text-center">No dinner added</p>
                                )}
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}