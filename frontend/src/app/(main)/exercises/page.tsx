import {Card, CardContent} from "../../../components/ui/card";

export default async function ExercisesPage() {
    const data = await fetch('http://localhost:8000/api/exercises');
    const exercises = await data.json();
     return (
         <div className="min-h-screen py-10 px-6">
             <h1 className="text-3xl font-bold text-center  mb-10">
                 🏋️‍♂️ All Exercises
             </h1>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {exercises.map((exercise) => (
                     <Card key={exercise.id}>
                         <CardContent>
                     <div
                         className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
                     >
                         <h2 className="text-xl font-semibold  mb-2">
                             {exercise.name}
                         </h2>

                         <p className="text-sm  font-medium mb-3">
                             {exercise.muscleGroup || "General"}
                         </p>

                         <p className=" text-sm leading-relaxed line-clamp-3">
                             {exercise.description || "No description available."}
                         </p>

                         <div className="mt-4 flex justify-end">
                             <button className=" text-sm font-medium hover:underline">
                                 View Details →
                             </button>
                         </div>
                     </div>
                         </CardContent>
                     </Card>
                 ))}
             </div>
         </div>
     );
}