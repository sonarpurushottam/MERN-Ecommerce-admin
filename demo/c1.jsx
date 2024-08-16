<div className="mb-4">
<label className="block text-gray-700">Category</label>
<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
>
  <option value="">Select a category</option>
  {data?.categories.map((c) => (
    <option key={c._id} value={c._id}>
      {c.name}
    </option>
  ))}
</select>
</div>