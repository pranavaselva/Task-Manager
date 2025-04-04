import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const TaskForm = ({ onSubmit, defaultValues = { title: "", description: "", priority: "medium", dueDate: undefined }, isEditing = false }) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm({ defaultValues });

  const handleFormSubmit = async (data) => {
    try {
      console.log("Submitting Task:", data); 

      const token = localStorage.getItem("token");

      if (isEditing && !data.id) {
        console.error("Error: Task ID is missing for update");
        return;
      }

      const url = isEditing 
        ? `http://localhost:3000/api/tasks/update/${data.id}`  // Ensure ID is present
        : "http://localhost:3000/api/tasks/create";  

      const method = isEditing ? "PATCH" : "POST";

      const response = await axios({
        method,
        url,
        data,
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(isEditing ? "Task Updated Successfully" : "Task Created Successfully");
      onSubmit(response.data.task);

      reset(); 
    } catch (error) {
      console.error("Task Submission Error:", error.response?.data?.message || "Something went wrong");
    }
};

  return (
    <form onSubmit={handleSubmit((data) => handleFormSubmit(data, reset))} className="space-y-6 animate-fade-in">
      <div>
        <label className="block text-sm font-medium">Task Title</label>
        <input {...register("title", { required: true })} placeholder="Enter task title" className="input input-bordered w-full" />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea {...register("description")} placeholder="Enter task details" className="textarea textarea-bordered w-full resize-none" rows={3}></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium">Priority</label>
          <select {...register("priority")} className="select select-bordered w-full">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <input type="date" className="input input-bordered w-full" onChange={(e) => setValue("dueDate", e.target.value)} />
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">{isEditing ? "Update Task" : "Create Task"}</button>
      </div>
    </form>
  );
};

export default TaskForm;
