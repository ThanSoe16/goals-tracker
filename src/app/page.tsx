"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type Dream = {
  id: string;
  title: string;
  icon: string;
  color: string;
  tasks: Task[];
};

const colorOptions = [
  { name: "Pink", classes: "bg-pink-50 border-pink-200" },
  { name: "Blue", classes: "bg-blue-50 border-blue-200" },
  { name: "Green", classes: "bg-green-50 border-green-200" },
  { name: "Purple", classes: "bg-purple-50 border-purple-200" },
  { name: "Yellow", classes: "bg-yellow-50 border-yellow-200" },
  { name: "Red", classes: "bg-red-50 border-red-200" },
  { name: "Indigo", classes: "bg-indigo-50 border-indigo-200" },
  { name: "Orange", classes: "bg-orange-50 border-orange-200" },
];

const STORAGE_KEY = "dreams-tracker-data";

const defaultDreams: Dream[] = [
  {
    id: "1",
    title: "Trip to Japan",
    icon: "🇯🇵",
    color: "bg-blue-50 border-blue-200",
    tasks: [
      { id: "1", text: "Save money for the trip", completed: true },
      { id: "2", text: "Apply for passport", completed: true },
      { id: "3", text: "Book flights", completed: false },
      { id: "4", text: "Visit Tokyo Skytree", completed: false },
      { id: "5", text: "Try authentic ramen", completed: false },
      { id: "6", text: "Visit Fushimi Inari Shrine", completed: false },
      { id: "7", text: "Experience cherry blossom season", completed: false },
      { id: "8", text: "Stay in a traditional ryokan", completed: false },
    ],
  },
];

export default function Home() {
  const [dreams, setDreams] = useState<Dream[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDreamTitle, setNewDreamTitle] = useState("");
  const [newDreamIcon, setNewDreamIcon] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].classes);
  const [newTaskInputs, setNewTaskInputs] = useState<{ [dreamId: string]: string }>({});
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState<{ isOpen: boolean; dreamId: string | null }>({
    isOpen: false,
    dreamId: null,
  });

  // Load dreams from localStorage on component mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedDreams = JSON.parse(saved);
        setDreams(parsedDreams);
      } else {
        // Set default dreams if no saved data
        setDreams(defaultDreams);
      }
    } catch (error) {
      console.error("Error loading dreams from localStorage:", error);
      setDreams(defaultDreams);
    }
  }, []);

  // Save dreams to localStorage whenever dreams change
  useEffect(() => {
    if (dreams.length > 0 || localStorage.getItem(STORAGE_KEY)) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
      } catch (error) {
        console.error("Error saving dreams to localStorage:", error);
      }
    }
  }, [dreams]);

  const getProgress = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((task) => task.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const addNewDream = () => {
    if (!newDreamTitle.trim()) return;

    const newDream: Dream = {
      id: Date.now().toString(),
      title: newDreamTitle,
      icon: newDreamIcon || "🎯",
      color: selectedColor,
      tasks: [],
    };

    setDreams([...dreams, newDream]);
    setNewDreamTitle("");
    setNewDreamIcon("");
    setSelectedColor(colorOptions[0].classes);
    setIsDialogOpen(false);
  };

  const openDeleteConfirm = (dreamId: string) => {
    setDeleteConfirmDialog({ isOpen: true, dreamId });
  };

  const deleteDream = () => {
    if (deleteConfirmDialog.dreamId) {
      setDreams(dreams.filter((dream) => dream.id !== deleteConfirmDialog.dreamId));
      setDeleteConfirmDialog({ isOpen: false, dreamId: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmDialog({ isOpen: false, dreamId: null });
  };

  const addTask = (dreamId: string, taskText: string) => {
    if (!taskText.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: taskText,
      completed: false,
    };

    setDreams(
      dreams.map((dream) =>
        dream.id === dreamId
          ? { ...dream, tasks: [...dream.tasks, newTask] }
          : dream
      )
    );

    setNewTaskInputs({ ...newTaskInputs, [dreamId]: "" });
  };

  const toggleTask = (dreamId: string, taskId: string) => {
    setDreams(
      dreams.map((dream) =>
        dream.id === dreamId
          ? {
              ...dream,
              tasks: dream.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : dream
      )
    );
  };

  const deleteTask = (dreamId: string, taskId: string) => {
    setDreams(
      dreams.map((dream) =>
        dream.id === dreamId
          ? { ...dream, tasks: dream.tasks.filter((task) => task.id !== taskId) }
          : dream
      )
    );
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dreams & Goals Tracker
          </h1>
          <p className="text-gray-600 mb-6">
            Turn your dreams into achievable goals with visual progress tracking
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="inline-flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Dream
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Dream</DialogTitle>
                <DialogDescription>
                  Add a new dream or goal to track your progress.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Dream Title
                  </label>
                  <Input
                    id="title"
                    value={newDreamTitle}
                    onChange={(e) => setNewDreamTitle(e.target.value)}
                    placeholder="e.g., Learn Guitar"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="icon" className="text-sm font-medium">
                    Icon/Emoji
                  </label>
                  <Input
                    id="icon"
                    value={newDreamIcon}
                    onChange={(e) => setNewDreamIcon(e.target.value)}
                    placeholder="e.g., 🎸"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Color Theme</label>
                  <div className="grid grid-cols-4 gap-2">
                    {colorOptions.map((color) => (
                      <div
                        key={color.name}
                        className={`h-12 rounded-md cursor-pointer border-2 transition-all ${
                          color.classes
                        } ${
                          selectedColor === color.classes
                            ? "ring-2 ring-ring ring-offset-2"
                            : ""
                        }`}
                        onClick={() => setSelectedColor(color.classes)}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="button" onClick={addNewDream}>
                  Create Dream
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        {dreams.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No dreams yet!</h2>
            <p className="text-gray-600">
              Click &quot;Add New Dream&quot; to start tracking your goals
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dreams.map((dream) => (
              <Card
                key={dream.id}
                className={`${dream.color} transition-all hover:shadow-lg`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{dream.icon}</span>
                    <CardTitle className="text-xl text-gray-900">{dream.title}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openDeleteConfirm(dream.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Progress</span>
                      <span className="font-medium text-gray-900">
                        {getProgress(dream.tasks)}% complete
                      </span>
                    </div>
                    <Progress value={getProgress(dream.tasks)} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    {dream.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center space-x-2 group"
                      >
                        <button
                          onClick={() => toggleTask(dream.id, task.id)}
                          className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-colors ${
                            task.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-300 hover:border-green-500"
                          }`}
                        >
                          {task.completed && <Check className="h-3 w-3" />}
                        </button>
                        <span
                          className={`flex-1 ${
                            task.completed
                              ? "line-through text-gray-500"
                              : "text-gray-900"
                          }`}
                        >
                          {task.text}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTask(dream.id, task.id)}
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a new task..."
                      value={newTaskInputs[dream.id] || ""}
                      onChange={(e) =>
                        setNewTaskInputs({
                          ...newTaskInputs,
                          [dream.id]: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addTask(dream.id, newTaskInputs[dream.id] || "");
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      size="icon"
                      onClick={() =>
                        addTask(dream.id, newTaskInputs[dream.id] || "")
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={deleteConfirmDialog.isOpen} onOpenChange={(open) => !open && cancelDelete()}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Dream</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this dream? This action cannot be undone and will remove all associated tasks.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button type="button" variant="destructive" onClick={deleteDream}>
                Delete Dream
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
