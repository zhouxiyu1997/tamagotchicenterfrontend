"use client";
import { useEffect, useState } from "react";
import { fetchHistoryEvents } from "../services/historyEvent";

export default function HomePage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchHistoryEvents().then(setEvents);
  }, []);

  // 按 firstTime 由近到远排序
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.firstTime).getTime() - new Date(a.firstTime).getTime()
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">拓麻歌子发展史</h1>
      <div className="relative border-l-2 border-green-400 pl-8 py-8">
        {sortedEvents.map((event) => (
          <div key={event.id} className="mb-12 relative">
            <div className="absolute -left-4 top-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow"></div>
            <div>
              <div className="text-green-700 font-bold text-lg">
                {event.firstTime}
              </div>
              <div className="text-xl font-semibold mt-1">{event.title}</div>
              <div className="mt-2 text-gray-700">
                {Array.isArray(event.description) &&
                  event.description.map((block: any, idx: number) =>
                    block.type === "paragraph" ? (
                      <p key={idx}>
                        {block.children
                          ?.map((child: any, cidx: number) => child.text)
                          .join("")}
                      </p>
                    ) : null
                  )}
              </div>
              <div className="flex gap-2 mt-2">
                {Array.isArray(event.image) &&
                  event.image.map((img: any) => (
                    <img
                      key={img.id}
                      src={
                        img.url.startsWith("http")
                          ? img.url
                          : `http://localhost:1337${img.url}`
                      }
                      alt={img.name}
                      className="w-32 h-32 object-cover rounded"
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
