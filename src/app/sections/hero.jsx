import { Button } from "@/components/ui/button"


export default function Hero() {
    return(
        <>
<section className="mt-[140px] mx-8 px-4 relative">
  <div className="max-w-6xl mx-auto w-full">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-12">
        <div className="space-y-6">
          <div className="overflow-hidden">
            <h1 className="text-7xl md:text-8xl font-light tracking-tight leading-[0.9] hover:tracking-wide transition-all duration-700 cursor-default">
              Ayan
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-primary transition-all duration-300 hover:w-16"></div>
            <span className="text-lg tracking-[0.1em] text-muted-foreground">
              Developer
            </span>
          </div>
        </div>
        
        <p className="text-xl leading-relaxed text-muted-foreground max-w-lg">
         I build full-stack apps with Next.js, React, Redux, and Node.js — crafting clean UIs, scalable APIs, JWT auth, and MongoDB backends.
        </p>

        <div className="flex gap-6 translate-y-28">
          <Button variant="transparent" className="group p-0 h-auto">
            <span className="border-b border-primary pb-1 group-hover:border-primary/60 transition-colors">
              Latest Posts
            </span>
          </Button>
        </div>
      </div>
      
      <div className="flex justify-center lg:justify-end">
        <div className="w-80 h-80 border border-primary/10 relative group cursor-pointer">
          <div className="absolute inset-4 border border-primary/20 transition-all duration-500 group-hover:inset-2"></div>
          <div className="absolute inset-8 bg-primary/5 transition-all duration-500 group-hover:bg-primary/10"></div>
        </div>
      </div>
    </div>
  </div>
</section>
        </>
    )
}