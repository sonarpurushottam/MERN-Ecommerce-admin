<Select
value={category}
onChange={(e) => setCategory(e.target.value)}
label="Assigned to"
placeholder="Select a user"
labelPlacement="outside"
className="max-w-xs"
>
{data?.categories.map((category) => (
  <SelectItem key={category._id} value={c._id} textValue={category.name}>
    <div className="flex gap-2 items-center">
      <Avatar alt={category.name} className="flex-shrink-0" size="sm" src={category.image} />
      <div className="flex flex-col">
        <span className="text-small">{category.name}</span>
        
      </div>
    </div>
  </SelectItem>
))}
</Select>