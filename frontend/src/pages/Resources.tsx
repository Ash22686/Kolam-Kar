"use client";

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";

// --- Data Updated with imageUrl for each resource ---
const sectionsData = [
  {
    id: "historical",
    title: "Historical Roots",
    imageUrl: "/Historical.png",
    summary: "Trace the origins of Kolam through ancient literature and cultural records.",
    resources: [
      { title: "Google Arts & Culture", description: "An illustrated story explaining that Kolam dates back over millennia – even older than the Ramayana epic – and remains a daily ritual of Tamil women.", link: "https://artsandculture.google.com/story/rangoli-for-diwali/sQWxwh-VUtKR3A?hl=en", sourceName: "artsandculture.google.com", imageUrl: "https://lh3.googleusercontent.com/ci/AL18g_Q1L6VUkPPe0XAPJxQtN2dET9gugj5SXqtE6Ja4EBbFMprbcC9_gwzSCxqRKplKtO3YahAteP6L" },
      { title: "Sahapedia", description: "Scholarly overview noting the earliest written reference to 'kōlam' from a 13th-century temple inscription and tracing its roots in Sangam-era sacred cosmology.", link: "https://www.sahapedia.org/significance-of-kolam-tamil-culture", sourceName: "sahapedia.org", imageUrl: "https://www.sahapedia.org/sites/default/files/styles/sp_page_banner_800x800/public/IMG_7569_0.JPG?itok=may0uQf9" },
      { title: "Smithsonian NMAA", description: "Highlights that Kolam is formed by dots and lines, embodying the duality of simplicity and complexity in an art practiced daily by women as a communal ritual.", link: "https://asia.si.edu/whats-on/events/search/event:170543037/", sourceName: "asia.si.edu", imageUrl: "https://www.trumba.com/i/DgAitZX9G1%2Ary7jdHodw8XJ-.jpg" },
    ],
  },
  {
    id: "significance",
    title: "Cultural Significance",
    imageUrl: "/Cultural.png",
    summary: "Understand why Kolam is a daily ritual of hope, community, and spirituality.",
    resources: [
      { title: "DailyGood", description: "An engaging essay describing how each dawn Tamil women draw Kolams to welcome Lakshmi and to feed insects and birds, thus 'feeding a thousand souls'.", link: "https://www.dailygood.org/story/10312/kolam-ritual-art/", sourceName: "dailygood.org", imageUrl: "/thumbnails/article-thumb.png" },
      { title: "Sahapedia", description: "Anthropological article showing how Kolam is learned intergenerationally and its role in shaping 'ideal' womanhood, patience, and dexterity.", link: "https://www.sahapedia.org/kolam-and-making-tamil-femininity", sourceName: "sahapedia.org", imageUrl: "https://www.sahapedia.org/sites/default/files/styles/sp_page_banner_800x800/public/IMG_7569_0.JPG?itok=may0uQf9" },
      { title: "CasualWalker blog", description: "A travel blog on Chennai’s annual Mylapore Festival and its Kolam contest, a community celebration that turns streets into a canvas.", link: "https://casualwalker.com/sundaram-finance-mylapore-festival-kolam-vizha-largest-kolam-rangoli-contest-north-mada-street-mylapore", sourceName: "casualwalker.com", imageUrl: "https://casualwalker.com/wp-content/uploads/2025/01/Mylapore-Festival-Kolam-Contest-Kolam-Vizha-Rangoli-16.jpg" },
    ],
  },
  {
    id: "mathematics",
    title: "The Mathematical Beauty",
    imageUrl: "/Mathematical.png",
    summary: "Delve into the fascinating intersection of Kolam with geometry, algorithms, and graph theory.",
    resources: [
      { title: "Atlas Obscura", description: "A popular science piece explaining Kolam’s geometry and quoting mathematician Marcia Ascher on Kolam as 'an unusual example of the expression of mathematical ideas in a cultural setting'.", link: "https://www.atlasobscura.com/articles/indian-rice-art-kolam", sourceName: "atlasobscura.com", imageUrl: "https://img.atlasobscura.com/tuRLQLcMLJqbiWScE26JPkjyj6e4nRsx_sWx4XXCbrI/rt:fit/w:600/c:4544:3029:nowe:2698:1305/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL2Fzc2V0/cy9lYTc2YTFhMy1k/ZmRkLTQ0NjgtYjE5/OC1hMjQ5ZDFlM2Vk/YTE3NTE2YWNlYzFh/ZTgxMzhmNjNfR2V0/dHlJbWFnZXMtNTU4/NDg0NDY1LmpwZw.jpg" },
      { title: "Childhood Education Journal", description: "Analyzes Kolam’s geometry, listing implicit drawing rules (loops, symmetry) and discussing how observing Kolam can teach children visual/spatial math.", link: "https://eric.ed.gov/?id=EJ994402", sourceName: "eric.ed.gov", imageUrl: "https://www.imaginary.org/sites/default/files/media-icons/default/application-octet-stream.png" },
      { title: "Medium (Liubauer)", description: "A technical blog post connecting Kolam to graph theory, describing each closed Kolam curve as an Eulerian circuit on a grid of points.", link: "https://liubauer.medium.com/mathematics-of-kolam-folkloric-graph-theory-4b3acc79d5cb", sourceName: "liubauer.medium.com", imageUrl: "https://miro.medium.com/v2/da:true/resize:fit:1200/0*k5FPxWwxJchE7z73" },
      { title: "IMAGINARY", description: "Interactive video showing how to use an L-system (formal grammar) to generate a single-thread Kolam, explaining the output is an Eulerian graph.", link: "https://www.imaginary.org/film/mathlapse-l-system-for-single-knot-kolam-pattern-generation", sourceName: "imaginary.org", imageUrl: "https://www.imaginary.org/sites/default/files/media-icons/default/application-octet-stream.png" },
      { title: "Hidden Mathematics in Kolams (YouTube)", description: "Educational talk by Vijaya R. Nagarajan delving into Kolam’s symmetries and geometry, showing how they can be encoded into graphs.", link: "https://www.youtube.com/watch?v=E_9FtRvGcs0", sourceName: "YouTube", imageUrl: "https://i.ytimg.com/vi/E_9FtRvGcs0/maxresdefault.jpg" },
      { title: "Maths and Myths behind Sikku Kolam (YouTube)", description: "A lecture from DakshinaChitra Museum explaining the mathematical structure of sikku (dot-grid) Kolams and related folklore.", link: "https://www.youtube.com/watch?v=7nIMa7Fq0eo", sourceName: "YouTube", imageUrl: "https://i.ytimg.com/vi/7nIMa7Fq0eo/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGEMgXihyMA8=&rs=AOn4CLCAVHKhe7PVMxTAyBmxlHeOHw2TKQ" },
      { title: "Kōlams in Graph Theory (Thesis PDF)", description: "A master’s thesis analyzing Kolam via graph theory, formalizing how to test if a Kolam is drawn in one stroke (monolinearity).", link: "https://digitalcommons.murraystate.edu/etd/306/", sourceName: "Murray State University", imageUrl: "https://www.imaginary.org/sites/default/files/media-icons/default/application-octet-stream.png" },
    ],
  },
  {
    id: "tutorials",
    title: "Tutorials & Learning",
    imageUrl: "/Tutorials.png",
    summary: "Ready to draw? Start your journey with these handpicked guides for all skill levels.",
    resources: [
      { title: "Instructables: KOLAM PAINTING!!", description: "A photo-rich step-by-step Kolam drawing guide introducing materials, dot-grid variants, and drawing techniques for beginners.", link: "https://www.instructables.com/KOLAM-PAINTING/", sourceName: "instructables.com", imageUrl: "https://i.ytimg.com/vi/7nIMa7Fq0eo/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGEMgXihyMA8=&rs=AOn4CLCAVHKhe7PVMxTAyBmxlHeOHw2TKQ" },
      { title: "Anita’s Feast (Blog)", description: "A cultural article explaining how floors are prepared and Kolams are drawn with rice powder, with photos of festival Kolams and modern adaptations.", link: "https://www.anitasfeast.com/blog/2019/11/kolam-art/", sourceName: "anitasfeast.com", imageUrl: "https://www.anitasfeast.com/blog/wp-content/uploads/2020/01/20190116_115943.jpg" },
      { title: "How to prepare Kolam Maavu (YouTube)", description: "A short tutorial video showing how to make wet rice-flour paste and draw the simplest 'maa Kolam'. Great for learning the authentic pouring technique.", link: "https://www.youtube.com/watch?v=dvg5hev3IFM", sourceName: "YouTube", imageUrl: "https://i.ytimg.com/vi/dvg5hev3IFM/maxresdefault.jpg" },
      { title: "Mattu Pongal Kolam 2025 (Tamil)", description: "Tamil-language news feature with step-by-step images teaching how to draw a Pongal themed Kolam using a 6×4 dot-grid.", link: "https://tamil.indianexpress.com/lifestyle/maatu-pongal-2025-special-kolam-8620679", sourceName: "Indian Express Tamil", imageUrl: "https://img-cdn.publive.online/fit-in/1200x675/indian-express-tamil/media/media_files/2025/01/14/exjiw5pwigSV4dX6MLLD.jpg" },
      { title: "How to Draw Kolam (Tamil, YouTube)", description: "Beginner Kolam drawing videos in Tamil, teaching basic Kolam motifs step-by-step. Useful for Tamil speakers learning foundational Kolams.", link: "https://www.youtube.com/c/TamilArtsCrafts", sourceName: "YouTube (Tamil)", imageUrl: "https://yt3.googleusercontent.com/eXci_hzRz_02E8lfgBp25CQaPkXDF_rjuG1kgE2bvzQm9d4thQwlOdBdYC9laN4XNW833Skewg=s900-c-k-c0x00ffffff-no-rj" },
      { title: "Kolam Podu (YouTube Channel)", description: "A dedicated YouTube channel featuring a wide variety of Kolam tutorials, from simple designs to complex festival patterns. A great resource for visual learners.", link: "https://www.youtube.com/@kolampodu/featured", sourceName: "YouTube Channel", imageUrl: "https://yt3.googleusercontent.com/vN-Oc8yWaViqehHOWq9wTI2CSD8RYLiMFHMCf_7-VZh3gcm5uVfUkSipsZUjlSz4j7EGvRIvLQ=s900-c-k-c0x00ffffff-no-rj" },
    ],
  },
];

const Resources = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const animationVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  const selectedData = expandedSection ? sectionsData.find(s => s.id === expandedSection) : null;

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-black min-h-screen">
        <div className="container mx-auto px-4 lg:px-6 py-16 md:py-24">
          <AnimatePresence mode="wait">
            {expandedSection === null ? (
              <motion.div
                key="grid"
                variants={animationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="max-w-6xl mx-auto"
              >
                <header className="text-center mb-16">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                    Kolam Knowledge Hub
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A curated collection of resources to explore the rich history, culture, and science behind this timeless art form.
                  </p>
                  <Separator className="w-24 mx-auto mt-6" />
                </header>
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
                  {sectionsData.map((section) => (
                    <motion.div
                      key={section.id}
                      whileHover={{ y: -8, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      onClick={() => setExpandedSection(section.id)}
                      className="cursor-pointer"
                    >
                      <Card className="h-full group shadow-lg hover:shadow-2xl transition-shadow duration-300 border-gray-200 dark:border-gray-800 overflow-hidden rounded-xl">
                        <div className="aspect-video overflow-hidden">
                          <img src={section.imageUrl} alt={section.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                          <p className="text-muted-foreground text-sm">{section.summary}</p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="details"
                variants={animationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="max-w-4xl mx-auto"
              >
                <div className="mb-10">
                  <Button variant="ghost" onClick={() => setExpandedSection(null)} className="mb-6 text-muted-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Categories
                  </Button>
                  <h1 className="text-4xl font-bold tracking-tight mb-2">{selectedData.title}</h1>
                  <p className="text-lg text-muted-foreground">{selectedData.summary}</p>
                </div>

                {/* --- UPDATED RESOURCE LISTING --- */}
                <div className="space-y-4">
                  {selectedData.resources.map((resource, i) => (
                    <a href={resource.link} target="_blank" rel="noopener noreferrer" key={i} className="block group">
                      <Card className="shadow-md hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300 border-gray-200 dark:border-gray-800 overflow-hidden">
                        <div className="flex h-full">
                          {/* Thumbnail */}
                          <div className="w-1/3 md:w-1/4 flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                            <img
                              src={resource.imageUrl}
                              alt={resource.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Content */}
                          <div className="w-2/3 md:w-3/4 p-4 flex flex-col justify-between">
                            <div>
                              <h3 className="font-bold text-base lg:text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                                {resource.title}
                              </h3>
                              <p className="text-muted-foreground text-xs lg:text-sm mt-2 line-clamp-2 md:line-clamp-3">
                                {resource.description}
                              </p>
                            </div>
                            <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                              <Badge variant="secondary" className="text-xs">
                                {resource.sourceName}
                              </Badge>
                              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </a>
                  ))}
                </div>
                {/* --- END OF UPDATE --- */}

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;