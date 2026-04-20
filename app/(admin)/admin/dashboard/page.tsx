import { prisma } from "@/lib/db";
import { addShop, deleteShop, updateShop, addHighlight, deleteHighlight, updateHighlight, logout } from "@/app/actions";

export default async function AdminDashboard() {
  const shops = await prisma.shop.findMany({ orderBy: { createdAt: "desc" } });
  const highlights = await prisma.highlight.findMany({ orderBy: { createdAt: "desc" } });

  // Calculate unique floors active in the database
  const uniqueFloors = Array.from(new Set(shops.map(shop => shop.floor)));
  const floorCount = uniqueFloors.length;

  return (
    <div className="relative z-[2] p-8 min-h-screen text-zinc-100 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl text-foreground font-light tracking-tighter">
              MALL <span className="text-amber-500 font-bold">CORE</span>
            </h1>
            <div className="flex gap-3 items-center">
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
                {shops.length} {shops.length === 1 ? 'Shop' : 'Shops'}
              </span>
              <span className="w-1 h-1 bg-zinc-700 rounded-full" />
              <span className="text-xs text-amber-500/80 uppercase tracking-widest font-bold">
                {floorCount} {floorCount === 1 ? 'Floor' : 'Floors'} Active
              </span>
            </div>
          </div>

          <form action={logout}>
            <button type="submit" className="bg-red-500/10 text-red-500 px-6 py-2 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-colors font-medium">
              Logout
            </button>
          </form>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* ========================================== */}
          {/* LEFT COLUMN: SHOP MANAGEMENT               */}
          {/* ========================================== */}
          <section className="space-y-8">
            <div className="border-b border-zinc-800 pb-2 flex justify-between items-end">
              <h2 className="text-2xl font-medium text-amber-500">Shops Directory</h2>
            </div>
            
            {/* Add Shop Form */}
            <form action={addShop} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Add New Shop</h3>
              
              <div className="space-y-3">
                <input aria-label="Shop Name" name="name" placeholder="Shop Name (e.g. Zara)" className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 transition-shadow" required />
                <input aria-label="Main Image URL" name="image" placeholder="Main Image URL" className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 transition-shadow" required />
                <input aria-label="Logo SVG URL" name="logo" placeholder="Logo SVG URL" className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 transition-shadow" required />
                <textarea aria-label="Description" name="description" placeholder="Description..." rows={3} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 transition-shadow resize-none" required />
                
                <div className="grid grid-cols-2 gap-3">
                  <select aria-label="Floor" name="floor" className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-zinc-100" required defaultValue="Level 0">
                    <option value="Level 0">Level 0</option>
                    <option value="Level 1">Level 1</option>
                    <option value="Level 2">Level 2</option>
                    <option value="Level 3">Level 3</option>
                  </select>

                  <select aria-label="Category" name="category" className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-zinc-100" required defaultValue="">
                    <option value="" disabled>Select Category</option>
                    <option value="Fashion & Lifestyle">Fashion</option>
                    <option value="Luxury & Accessories">Luxury</option>
                    <option value="Health & Beauty">Health</option>
                    <option value="Electronics & Gadgets">Electronics</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-amber-500 text-black font-bold py-3 rounded-lg hover:bg-amber-400 transition-colors">Add Shop</button>
            </form>

            {/* Shops List */}
            <div className="space-y-3">
              {shops.length === 0 ? (
                <div className="text-center py-10 bg-zinc-900/30 rounded-xl border border-zinc-800 border-dashed">
                  <p className="text-zinc-500 text-sm">No shops found. Add one above.</p>
                </div>
              ) : (
                shops.map(shop => (
                  <div key={shop.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 transition-all hover:border-zinc-700">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <img src={shop.logo} className="w-12 h-12 object-contain bg-white rounded-lg p-2" alt={`${shop.name} logo`} loading="lazy" />
                        <div>
                          <span className="font-bold block text-lg">{shop.name}</span>
                          <div className="flex gap-2 mb-1">
                             <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">{shop.category}</span>
                             <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">{shop.floor}</span>
                          </div>
                          <span className="text-xs text-zinc-400 line-clamp-1">{shop.description}</span>
                        </div>
                      </div>
                      
                      {/* Properly bound Server Action */}
                      <form action={deleteShop.bind(null, shop.id)}>
                        <button type="submit" className="text-red-500 hover:text-red-400 hover:bg-red-500/20 text-xs font-bold px-3 py-2 bg-red-500/10 rounded-md transition-colors">Del</button>
                      </form>
                    </div>

                    {/* Inline Edit Dropdown */}
                    <details className="mt-3 group">
                      <summary className="text-amber-500 text-xs font-medium cursor-pointer list-none hover:text-amber-400 transition-colors inline-block pt-2">
                        + Edit Shop
                      </summary>
                      <form action={updateShop} className="mt-4 space-y-3 bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                        <input type="hidden" name="id" value={shop.id} />
                        <input aria-label="Edit Name" name="name" defaultValue={shop.name} className="w-full bg-zinc-900 border border-zinc-700 p-2 text-sm rounded focus:ring-1 focus:ring-amber-500 outline-none" required />
                        <input aria-label="Edit Image" name="image" defaultValue={shop.image} className="w-full bg-zinc-900 border border-zinc-700 p-2 text-sm rounded focus:ring-1 focus:ring-amber-500 outline-none" required />
                        <input aria-label="Edit Logo" name="logo" defaultValue={shop.logo} className="w-full bg-zinc-900 border border-zinc-700 p-2 text-sm rounded focus:ring-1 focus:ring-amber-500 outline-none" required />
                        
                        <div className="grid grid-cols-2 gap-3">
                          <select aria-label="Edit Floor" name="floor" defaultValue={shop.floor} className="w-full bg-zinc-900 border border-zinc-700 p-2 text-sm rounded focus:ring-1 focus:ring-amber-500 outline-none text-zinc-100" required>
                            <option value="Level 0">Level 0</option>
                            <option value="Level 1">Level 1</option>
                            <option value="Level 2">Level 2</option>
                            <option value="Level 3">Level 3</option>
                          </select>
                          <select aria-label="Edit Category" name="category" defaultValue={shop.category} className="w-full bg-zinc-900 border border-zinc-700 p-2 text-sm rounded focus:ring-1 focus:ring-amber-500 outline-none text-zinc-100" required>
                            <option value="Fashion & Lifestyle">Fashion</option>
                            <option value="Luxury & Accessories">Luxury</option>
                            <option value="Health & Beauty">Health</option>
                            <option value="Electronics & Gadgets">Electronics</option>
                          </select>
                        </div>

                        <textarea aria-label="Edit Description" name="description" defaultValue={shop.description} className="w-full bg-zinc-900 border border-zinc-700 p-2 text-sm rounded focus:ring-1 focus:ring-amber-500 outline-none resize-none" rows={2} required />
                        
                        <button type="submit" className="w-full bg-zinc-800 text-white font-bold py-2 rounded hover:bg-zinc-700 transition-colors text-sm">Save Changes</button>
                      </form>
                    </details>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* ========================================== */}
          {/* RIGHT COLUMN: HIGHLIGHTS MANAGEMENT        */}
          {/* ========================================== */}
          <section className="space-y-8">
            <div className="border-b border-zinc-800 pb-2 flex justify-between items-end">
              <h2 className="text-2xl font-medium text-amber-500">Experience Highlights</h2>
            </div>
            
            {/* Add Highlight Form */}
            <form action={addHighlight} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Publish Highlight</h3>
              
              <div className="space-y-3">
                <input aria-label="Highlight Title" name="title" placeholder="Title (e.g. Dining & cafés)" className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 transition-shadow" required />
                <input aria-label="Background Image URL" name="img" placeholder="Background Image URL" className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 transition-shadow" required />
                <input aria-label="Slider ID" name="sliderName" placeholder="Slider ID (e.g. cfc)" className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 transition-shadow" required />
                <textarea aria-label="Highlight Description" name="desc" placeholder="Highlight Description..." rows={3} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 transition-shadow resize-none" required />
              </div>
              
              <button type="submit" className="w-full bg-amber-500 text-black font-bold py-3 rounded-lg hover:bg-amber-400 transition-colors">Publish Highlight</button>
            </form>

            {/* Highlights List */}
            <div className="space-y-3">
              {highlights.length === 0 ? (
                <div className="text-center py-10 bg-zinc-900/30 rounded-xl border border-zinc-800 border-dashed">
                  <p className="text-zinc-500 text-sm">No highlights found. Add one above.</p>
                </div>
              ) : (
                highlights.map(highlight => (
                  <div key={highlight.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 relative group overflow-hidden transition-colors hover:border-zinc-700">
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" style={{ backgroundImage: `url(${highlight.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="pr-4">
                        <span className="font-bold text-lg text-white block">{highlight.title}</span>
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{highlight.desc}</p>
                      </div>
                      
                      {/* Properly bound Server Action */}
                      <form action={deleteHighlight.bind(null, highlight.id)}>
                        <button type="submit" className="text-red-500 hover:text-red-400 hover:bg-red-500/20 text-xs font-bold px-3 py-2 bg-red-500/10 rounded-md transition-colors">Del</button>
                      </form>
                    </div>

                    {/* Inline Edit Dropdown */}
                    <details className="relative z-10 mt-3 group">
                      <summary className="text-amber-500 text-xs font-medium cursor-pointer list-none hover:text-amber-400 transition-colors inline-block pt-2">
                        + Edit Highlight
                      </summary>
                      <form action={updateHighlight} className="mt-4 space-y-3 bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                        <input type="hidden" name="id" value={highlight.id} />
                        <input aria-label="Edit Title" name="title" defaultValue={highlight.title} className="w-full bg-zinc-900 border border-zinc-700 p-2 text-sm rounded focus:ring-1 focus:ring-amber-500 outline-none" required />
                        <input aria-label="Edit Image" name="img" defaultValue={highlight.img} className="w-full bg-zinc-900 border border-zinc-700 p-2 text-sm rounded focus:ring-1 focus:ring-amber-500 outline-none" required />
                        <input aria-label="Edit Slider ID" name="sliderName" defaultValue={highlight.sliderName} className="w-full bg-zinc-900 border border-zinc-700 p-2 text-sm rounded focus:ring-1 focus:ring-amber-500 outline-none" required />
                        <textarea aria-label="Edit Description" name="desc" defaultValue={highlight.desc} className="w-full bg-zinc-900 border border-zinc-700 p-2 text-sm rounded focus:ring-1 focus:ring-amber-500 outline-none resize-none" rows={2} required />
                        <button type="submit" className="w-full bg-zinc-800 text-white font-bold py-2 rounded hover:bg-zinc-700 transition-colors text-sm">Save Changes</button>
                      </form>
                    </details>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}