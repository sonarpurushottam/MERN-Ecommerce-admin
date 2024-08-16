<div className="grid gap-6 sm:grid-cols-2">
<div className="mb-4">
  <Select
   value={brand}
   onChange={(e) => setBrand(e.target.value)}
    label="Brand"
    placeholder="Select a Brand"
    labelPlacement="outside"
    className="max-w-xs"
  >
    {data?.brands.map((brand) => (
      <SelectItem
        key={brand._id}
        value={brand._id}
        textValue={brand.name}
      >
        <div className="flex gap-2 items-center">
          <Avatar
            alt={brand.name}
            className="flex-shrink-0"
            size="sm"
            src={brand.image}
          />
          <div className="flex flex-col">
            <span className="text-small">{brand.name}</span>
          </div>
        </div>
      </SelectItem>
    ))}
  </Select>
</div>
</div>