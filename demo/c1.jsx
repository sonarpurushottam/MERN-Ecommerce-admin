<div className="mb-4">
            <label className="block text-gray-700">Brand</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a brand</option>
              {data?.brands.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>