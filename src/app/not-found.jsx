"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const BUILDS = [
  {
    name: "HOT ROD",
    icon: "🚗",
    description: "A rather speedy solution to a missing page.",
    type: "car",
  },
  {
    name: "CRANE",
    icon: "🏗️",
    description: "Heavy lifting required to find this page.",
    type: "crane",
  },
  {
    name: "FERRIS WHEEL",
    icon: "🎡",
    description: "Going round in circles looking for this page.",
    type: "wheel",
  },
  {
    name: "MOTORBIKE",
    icon: "🏍️",
    description: "This page apparently rode off.",
    type: "bike",
  },
  {
    name: "DIGGER",
    icon: "🚜",
    description: "Time to dig a little deeper.",
    type: "digger",
  },
  {
    name: "MACHINE",
    icon: "⚙️",
    description: "Somehow, this should fix everything.",
    type: "machine",
  },
];

/* =========================================================
   MECCANO PARTS
========================================================= */

function HoleStrip({ count = 6, vertical = false }) {
  return (
    <div
      className={
        vertical
          ? "absolute inset-y-2 left-1/2 flex -translate-x-1/2 flex-col justify-between"
          : "absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between"
      }
    >
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className="size-2 rounded-full bg-[#17191b] shadow-[inset_0_1px_2px_rgba(255,255,255,.15)] sm:size-2.5"
        />
      ))}
    </div>
  );
}

function MetalBeam({
  className = "",
  holes = 6,
  vertical = false,
  red = false,
}) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[3px] border ${
        red
          ? "border-red-300/40 bg-gradient-to-b from-red-500 via-red-700 to-red-900"
          : "border-white/25 bg-gradient-to-b from-[#d9dcde] via-[#777c80] to-[#303438]"
      } shadow-[0_8px_18px_rgba(0,0,0,.45)] ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-black/20" />

      <HoleStrip count={holes} vertical={vertical} />
    </div>
  );
}

function Bolt({ className = "", red = false }) {
  return (
    <div
      className={`absolute rounded-full border shadow-[0_5px_12px_rgba(0,0,0,.6)] ${
        red
          ? "border-red-300/50 bg-gradient-to-br from-red-300 via-red-600 to-red-900"
          : "border-white/25 bg-gradient-to-br from-[#d9dcde] via-[#686d71] to-[#202326]"
      } ${className}`}
    >
      <div className="absolute inset-[25%] rounded-full border border-black/50 bg-[#202326]" />

      <div className="absolute left-[34%] top-[28%] size-[18%] rounded-full bg-white/30" />
    </div>
  );
}

function Gear({
  className = "",
  size = "size-16",
  reverse = false,
  spinning = true,
}) {
  return (
    <div
      className={`absolute ${size} ${className} ${
        spinning
          ? reverse
            ? "animate-[gearReverse_3s_linear_infinite]"
            : "animate-[gearSlow_3s_linear_infinite]"
          : ""
      }`}
    >
      <div className="absolute inset-[12%] rounded-full border-[8px] border-[#777c80] bg-[#24272a] shadow-[0_5px_15px_rgba(0,0,0,.6)]">
        <div className="absolute inset-[25%] rounded-full border-2 border-white/20" />

        <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#111315]" />
      </div>

      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          className="absolute left-1/2 top-0 h-[24%] w-[18%] -translate-x-1/2 rounded-[2px] bg-[#777c80]"
          style={{
            transform: `rotate(${index * 45}deg) translateY(-2px)`,
            transformOrigin: "50% 50%",
          }}
        />
      ))}
    </div>
  );
}

function Wheel({
  className = "",
  size = "size-24",
  spinning = false,
}) {
  return (
    <div
      className={`absolute ${size} rounded-full border-[8px] border-[#777c80] bg-[#1c1f21] shadow-[0_8px_20px_rgba(0,0,0,.55)] ${
        spinning ? "animate-[wheelSpin_2.5s_linear_infinite]" : ""
      } ${className}`}
    >
      <div className="absolute inset-[16%] rounded-full border-2 border-white/15" />

      <div className="absolute left-1/2 top-1/2 h-[75%] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-[#888d91]" />

      <div className="absolute left-1/2 top-1/2 h-[75%] w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-90 bg-[#888d91]" />

      <div className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/20 bg-[#222527]" />
    </div>
  );
}

/* =========================================================
   GENERIC DRAGGABLE PIECE

   IMPORTANT:
   x/y are the CENTER of the piece.

   The previous version translated the piece twice:
   - once on the outer draggable element
   - once again on the inner wrapper

   That caused the finished models to look offset/broken.

   The piece now gets translated only once, so the finished
   models keep their intended shapes while every individual
   part remains independently draggable.
========================================================= */

function DraggablePiece({
  id,
  x,
  y,
  rotation = 0,
  onMove,
  onRotate,
  children,
  className = "",
  containerRef,
}) {
  const pieceRef = useRef(null);
  const dragRef = useRef(null);

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const element = pieceRef.current;
    const container = containerRef?.current;

    if (!element || !container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originalX: x,
      originalY: y,
      containerLeft: containerRect.left,
      containerTop: containerRect.top,
    };

    element.style.zIndex = "100";

    try {
      element.setPointerCapture(event.pointerId);
    } catch {
      // Ignore pointer capture failures.
    }
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const element = pieceRef.current;
    const container = containerRef?.current;

    if (!element || !container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const pieceRect = element.getBoundingClientRect();

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    let nextX = drag.originalX + deltaX;
    let nextY = drag.originalY + deltaY;

    /*
      x/y represent the centre of the piece.
      Keep the complete piece inside the workbench.
    */
    const halfWidth = pieceRect.width / 2;
    const halfHeight = pieceRect.height / 2;

    const minX = halfWidth;
    const maxX = Math.max(
      halfWidth,
      containerRect.width - halfWidth
    );

    const minY = halfHeight;
    const maxY = Math.max(
      halfHeight,
      containerRect.height - halfHeight
    );

    nextX = Math.max(minX, Math.min(maxX, nextX));
    nextY = Math.max(minY, Math.min(maxY, nextY));

    onMove(id, nextX, nextY);
  };

  const finishDrag = (event) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const element = pieceRef.current;

    if (element) {
      try {
        element.releasePointerCapture(event.pointerId);
      } catch {
        // Pointer capture may already have been released.
      }

      element.style.zIndex = "20";
    }

    dragRef.current = null;
  };

  const handleDoubleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    onRotate(id);
  };

  return (
    <div
      ref={pieceRef}
      className={`pointer-events-auto absolute cursor-grab touch-none select-none active:cursor-grabbing ${className}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        zIndex: 20,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onDoubleClick={handleDoubleClick}
      title="Drag to move • Double-click to rotate"
    >
      {children}
    </div>
  );
}

/* =========================================================
   FINISHED BUILD PART DEFINITIONS
========================================================= */

function getFinishedBuildParts(type) {
  switch (type) {
    /* -----------------------------------------------------
       HOT ROD
    ----------------------------------------------------- */
    case "car":
      return [
        {
          id: "car-body",
          type: "beam",
          x: 300,
          y: 145,
          rotation: -2,
          holes: 7,
          width: "w-[395px]",
        },
        {
          id: "car-top",
          type: "red-beam",
          x: 300,
          y: 100,
          rotation: 3,
          holes: 5,
          width: "w-[270px]",
        },
        {
          id: "car-front-frame",
          type: "vertical-beam",
          x: 220,
          y: 105,
          rotation: 8,
          holes: 4,
        },
        {
          id: "car-back-frame",
          type: "vertical-beam",
          x: 380,
          y: 105,
          rotation: -8,
          holes: 4,
        },
        {
          id: "car-wheel-left",
          type: "wheel",
          x: 205,
          y: 205,
          rotation: 0,
          size: "size-20",
        },
        {
          id: "car-wheel-right",
          type: "wheel",
          x: 395,
          y: 205,
          rotation: 0,
          size: "size-20",
        },
        {
          id: "car-bolt-left",
          type: "bolt",
          x: 250,
          y: 140,
          rotation: 0,
          size: "size-6",
        },
        {
          id: "car-bolt-right",
          type: "bolt",
          x: 350,
          y: 140,
          rotation: 0,
          size: "size-6",
        },
        {
          id: "car-gear",
          type: "gear",
          x: 300,
          y: 70,
          rotation: 0,
          size: "size-8",
        },
      ];

    /* -----------------------------------------------------
       CRANE
    ----------------------------------------------------- */
    case "crane":
      return [
        {
          id: "crane-base",
          type: "beam",
          x: 300,
          y: 220,
          rotation: 0,
          holes: 7,
          width: "w-[385px]",
        },
        {
          id: "crane-column",
          type: "vertical-beam",
          x: 190,
          y: 155,
          rotation: 2,
          holes: 5,
        },
        {
          id: "crane-top",
          type: "red-beam",
          x: 245,
          y: 70,
          rotation: -2,
          holes: 6,
          width: "w-[270px]",
        },
        {
          id: "crane-arm",
          type: "beam",
          x: 425,
          y: 150,
          rotation: 22,
          holes: 5,
          width: "w-[240px]",
        },
        {
          id: "crane-gear-large",
          type: "gear",
          x: 180,
          y: 215,
          rotation: 0,
          size: "size-14",
        },
        {
          id: "crane-gear-small",
          type: "gear",
          x: 235,
          y: 215,
          rotation: 0,
          size: "size-9",
          reverse: true,
        },
        {
          id: "crane-bolt",
          type: "bolt",
          x: 300,
          y: 215,
          rotation: 0,
          size: "size-6",
        },
        {
          id: "crane-hook",
          type: "hook",
          x: 500,
          y: 205,
        },
      ];

    /* -----------------------------------------------------
       FERRIS WHEEL
    ----------------------------------------------------- */
    case "wheel":
      return [
        {
          id: "wheel-support",
          type: "support",
          x: 300,
          y: 200,
          rotation: 0,
        },
        {
          id: "wheel-red-base",
          type: "red-beam",
          x: 220,
          y: 210,
          rotation: -12,
          holes: 5,
          width: "w-[265px]",
        },
        {
          id: "wheel-base",
          type: "beam",
          x: 380,
          y: 210,
          rotation: 12,
          holes: 5,
          width: "w-[265px]",
        },
        {
          id: "wheel-main",
          type: "ferris-wheel",
          x: 300,
          y: 100,
        },
      ];

    /* -----------------------------------------------------
       MOTORBIKE
    ----------------------------------------------------- */
    case "bike":
      return [
        {
          id: "bike-rear-wheel",
          type: "wheel",
          x: 175,
          y: 190,
          rotation: 0,
          size: "size-24",
        },
        {
          id: "bike-front-wheel",
          type: "wheel",
          x: 425,
          y: 190,
          rotation: 0,
          size: "size-24",
        },
        {
          id: "bike-lower-frame",
          type: "red-beam",
          x: 295,
          y: 175,
          rotation: 0,
          holes: 6,
          width: "w-[220px]",
        },
        {
          id: "bike-upper-frame",
          type: "beam",
          x: 260,
          y: 135,
          rotation: -18,
          holes: 5,
          width: "w-[150px]",
        },
        {
          id: "bike-rear-frame",
          type: "beam",
          x: 220,
          y: 135,
          rotation: -55,
          holes: 4,
          width: "w-[90px]",
        },
        {
          id: "bike-front-fork",
          type: "beam",
          x: 380,
          y: 135,
          rotation: 35,
          holes: 5,
          width: "w-[130px]",
        },
        {
          id: "bike-front-fork-2",
          type: "red-beam",
          x: 395,
          y: 140,
          rotation: 35,
          holes: 4,
          width: "w-[105px]",
        },
        {
          id: "bike-seat",
          type: "beam",
          x: 240,
          y: 105,
          rotation: 0,
          holes: 3,
          width: "w-[85px]",
        },
        {
          id: "bike-seat-support",
          type: "vertical-beam",
          x: 255,
          y: 125,
          rotation: 8,
          holes: 3,
        },
        {
          id: "bike-handle-stem",
          type: "beam",
          x: 400,
          y: 88,
          rotation: 72,
          holes: 3,
          width: "w-[70px]",
        },
        {
          id: "bike-handlebar",
          type: "red-beam",
          x: 410,
          y: 70,
          rotation: 0,
          holes: 3,
          width: "w-[75px]",
        },
        {
          id: "bike-engine",
          type: "gear",
          x: 300,
          y: 155,
          rotation: 0,
          size: "size-12",
          reverse: false,
        },
        {
          id: "bike-engine-mount",
          type: "bolt",
          x: 300,
          y: 180,
          rotation: 0,
          size: "size-6",
        },
        {
          id: "bike-rear-axle",
          type: "bolt",
          x: 175,
          y: 190,
          rotation: 0,
          size: "size-6",
        },
        {
          id: "bike-front-axle",
          type: "bolt",
          x: 425,
          y: 190,
          rotation: 0,
          size: "size-6",
        },
        {
          id: "bike-exhaust",
          type: "beam",
          x: 285,
          y: 205,
          rotation: 8,
          holes: 4,
          width: "w-[125px]",
        },
        {
          id: "bike-exhaust-end",
          type: "bolt",
          x: 350,
          y: 215,
          rotation: 0,
          size: "size-5",
        },
      ];

    /* -----------------------------------------------------
       DIGGER
    ----------------------------------------------------- */
    case "digger":
      return [
        {
          id: "digger-base",
          type: "red-beam",
          x: 300,
          y: 215,
          rotation: 0,
          holes: 7,
          width: "w-[300px]",
        },
        {
          id: "digger-track-left",
          type: "beam",
          x: 225,
          y: 230,
          rotation: 0,
          holes: 5,
          width: "w-[120px]",
        },
        {
          id: "digger-track-right",
          type: "beam",
          x: 375,
          y: 230,
          rotation: 0,
          holes: 5,
          width: "w-[120px]",
        },
        {
          id: "digger-wheel-1",
          type: "wheel",
          x: 190,
          y: 230,
          rotation: 0,
          size: "size-10",
        },
        {
          id: "digger-wheel-2",
          type: "wheel",
          x: 255,
          y: 230,
          rotation: 0,
          size: "size-10",
        },
        {
          id: "digger-wheel-3",
          type: "wheel",
          x: 345,
          y: 230,
          rotation: 0,
          size: "size-10",
        },
        {
          id: "digger-wheel-4",
          type: "wheel",
          x: 410,
          y: 230,
          rotation: 0,
          size: "size-10",
        },
        {
          id: "digger-platform",
          type: "red-beam",
          x: 300,
          y: 185,
          rotation: 0,
          holes: 4,
          width: "w-[120px]",
        },
        {
          id: "digger-cab-back",
          type: "vertical-beam",
          x: 265,
          y: 135,
          rotation: 0,
          holes: 4,
        },
        {
          id: "digger-cab-front",
          type: "vertical-beam",
          x: 325,
          y: 135,
          rotation: 0,
          holes: 4,
        },
        {
          id: "digger-cab-roof",
          type: "red-beam",
          x: 295,
          y: 105,
          rotation: 0,
          holes: 4,
          width: "w-[90px]",
        },
        {
          id: "digger-cab-middle",
          type: "beam",
          x: 295,
          y: 150,
          rotation: 0,
          holes: 3,
          width: "w-[70px]",
        },
        {
          id: "digger-boom",
          type: "red-beam",
          x: 380,
          y: 115,
          rotation: -25,
          holes: 5,
          width: "w-[180px]",
        },
        {
          id: "digger-boom-support",
          type: "beam",
          x: 350,
          y: 135,
          rotation: -55,
          holes: 4,
          width: "w-[110px]",
        },
        {
          id: "digger-dipper",
          type: "beam",
          x: 465,
          y: 105,
          rotation: 45,
          holes: 5,
          width: "w-[145px]",
        },
        {
          id: "digger-hydraulic",
          type: "beam",
          x: 430,
          y: 130,
          rotation: 65,
          holes: 3,
          width: "w-[85px]",
        },
        {
          id: "digger-bucket",
          type: "bucket",
          x: 525,
          y: 165,
          rotation: 15,
        },
        {
          id: "digger-pivot",
          type: "gear",
          x: 300,
          y: 180,
          rotation: 0,
          size: "size-12",
        },
      ];

    /* -----------------------------------------------------
       MACHINE
    ----------------------------------------------------- */
    case "machine":
    default:
      return [
        {
          id: "machine-main-beam",
          type: "beam",
          x: 300,
          y: 145,
          rotation: 0,
          holes: 7,
          width: "w-[385px]",
        },
        {
          id: "machine-red-beam",
          type: "red-beam",
          x: 300,
          y: 100,
          rotation: 90,
          holes: 4,
          width: "w-[190px]",
        },
        {
          id: "machine-gear-left",
          type: "gear",
          x: 200,
          y: 100,
          rotation: 0,
          size: "size-20",
        },
        {
          id: "machine-gear-right",
          type: "gear",
          x: 405,
          y: 120,
          rotation: 0,
          size: "size-14",
          reverse: true,
        },
        {
          id: "machine-gear-bottom",
          type: "gear",
          x: 300,
          y: 220,
          rotation: 0,
          size: "size-12",
        },
        {
          id: "machine-bolt",
          type: "bolt",
          x: 300,
          y: 140,
          rotation: 0,
          size: "size-7",
        },
        {
          id: "machine-base",
          type: "machine-base",
          x: 300,
          y: 225,
        },
      ];
  }
}

/* =========================================================
   RENDER FINISHED BUILD PART
========================================================= */

function renderFinishedPart(part) {
  switch (part.type) {
    case "beam":
      return (
        <MetalBeam
          className={`relative left-0 top-0 h-6 ${
            part.width || "w-36"
          }`}
          holes={part.holes || 6}
        />
      );

    case "red-beam":
      return (
        <MetalBeam
          className={`relative left-0 top-0 h-5 ${
            part.width || "w-36"
          }`}
          holes={part.holes || 6}
          red
        />
      );

    case "vertical-beam":
      return (
        <MetalBeam
          className="relative left-0 top-0 h-24 w-5"
          holes={part.holes || 4}
          vertical
        />
      );

    case "gear":
      return (
        <Gear
          className="relative left-0 top-0"
          size={part.size || "size-12"}
          reverse={part.reverse}
          spinning
        />
      );

    case "wheel":
      return (
        <Wheel
          className="relative left-0 top-0"
          size={part.size || "size-20"}
          spinning
        />
      );

    case "bolt":
      return (
        <Bolt
          className={`relative left-0 top-0 ${
            part.size || "size-6"
          }`}
        />
      );

    case "red-bolt":
      return (
        <Bolt
          className={`relative left-0 top-0 ${
            part.size || "size-6"
          }`}
          red
        />
      );

    case "support":
      return (
        <div className="relative h-28 w-4 bg-gradient-to-b from-[#aaaeb1] to-[#3a3e41]" />
      );

    case "ferris-wheel":
      return (
        <div className="relative size-36">
          <div className="absolute inset-0 animate-[wheelSpin_8s_linear_infinite] rounded-full border-[7px] border-[#888d91]">
            <div className="absolute inset-4 rounded-full border-2 border-white/15" />

            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 h-[2px] w-1/2 origin-left bg-[#888d91]"
                style={{
                  transform: `rotate(${index * 45}deg)`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/20 bg-[#222527]" />

            {[
              "left-[2px] top-1/2",
              "right-[2px] top-1/2",
              "left-1/2 top-[2px]",
              "left-1/2 bottom-[2px]",
            ].map((position, index) => (
              <span
                key={index}
                className={`absolute ${position} size-5 -translate-x-1/2 -translate-y-1/2 rounded-md border border-red-300/30 bg-red-600`}
              />
            ))}
          </div>
        </div>
      );

    case "hook":
      return (
        <div className="relative h-14 w-8 rounded-b-lg border border-white/20 bg-gradient-to-b from-[#888d91] to-[#34383b]">
          <div className="absolute -bottom-3 left-1/2 size-5 -translate-x-1/2 rounded-full border-2 border-yellow-300 bg-yellow-500/40" />
        </div>
      );

    case "bucket":
      return (
        <div className="relative h-10 w-20 rotate-[18deg] border border-yellow-300/30 bg-gradient-to-b from-yellow-500 to-orange-700 shadow-lg" />
      );

    case "machine-base":
      return (
        <div className="relative h-10 w-40 rounded-sm border border-white/20 bg-gradient-to-b from-[#777c80] to-[#25282b]" />
      );

    default:
      return null;
  }
}

/* =========================================================
   DRAGGABLE FINISHED BUILD

   Every individual finished-build part remains its own
   DraggablePiece.

   This means:
   - drag individual parts
   - double-click individual parts to rotate
   - models start assembled
   - moving one part does NOT move the others
========================================================= */

function DraggableFinishedBuild({
  type,
  buildNumber,
}) {
  const [parts, setParts] = useState([]);
  const buildCanvasRef = useRef(null);

  useEffect(() => {
    setParts(getFinishedBuildParts(type));
  }, [type, buildNumber]);

  const movePart = (id, x, y) => {
    setParts((currentParts) =>
      currentParts.map((part) =>
        part.id === id
          ? {
              ...part,
              x,
              y,
            }
          : part
      )
    );
  };

  const rotatePart = (id) => {
    setParts((currentParts) =>
      currentParts.map((part) =>
        part.id === id
          ? {
              ...part,
              rotation: part.rotation + 45,
            }
          : part
      )
    );
  };

  return (
    <div
      ref={buildCanvasRef}
      className="absolute inset-0 pointer-events-none"
    >
      {parts.map((part) => (
        <DraggablePiece
          key={part.id}
          id={part.id}
          x={part.x}
          y={part.y}
          rotation={part.rotation}
          onMove={movePart}
          onRotate={rotatePart}
          containerRef={buildCanvasRef}
        >
          {renderFinishedPart(part)}
        </DraggablePiece>
      ))}
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function NotFound() {
  const [isBuilding, setIsBuilding] = useState(false);
  const [build, setBuild] = useState(null);
  const [buildNumber, setBuildNumber] = useState(0);

  const [pieces, setPieces] = useState([
    {
      id: "beam-1",
      type: "beam",
      x: 85,
      y: 65,
      rotation: -18,
      holes: 5,
    },
    {
      id: "beam-2",
      type: "red-beam",
      x: 515,
      y: 58,
      rotation: 21,
      holes: 5,
    },
    {
      id: "beam-3",
      type: "beam",
      x: 145,
      y: 195,
      rotation: 35,
      holes: 4,
    },
    {
      id: "beam-4",
      type: "beam",
      x: 455,
      y: 190,
      rotation: -30,
      holes: 4,
    },
    {
      id: "gear-1",
      type: "gear",
      x: 175,
      y: 105,
      rotation: 0,
      size: "size-14",
    },
    {
      id: "gear-2",
      type: "gear",
      x: 425,
      y: 112,
      rotation: 0,
      size: "size-12",
      reverse: true,
    },
    {
      id: "bolt-1",
      type: "bolt",
      x: 75,
      y: 215,
      rotation: 0,
      size: "size-7",
    },
    {
      id: "bolt-2",
      type: "red-bolt",
      x: 525,
      y: 215,
      rotation: 0,
      size: "size-8",
    },
  ]);

  const initialPiecePositions = [
    {
      id: "beam-1",
      x: 0.08,
      y: 0.22,
      rotation: -18,
    },
    {
      id: "beam-2",
      x: 0.92,
      y: 0.18,
      rotation: 21,
    },
    {
      id: "beam-3",
      x: 0.18,
      y: 0.77,
      rotation: 35,
    },
    {
      id: "beam-4",
      x: 0.82,
      y: 0.75,
      rotation: -30,
    },
    {
      id: "gear-1",
      x: 0.27,
      y: 0.38,
      rotation: 0,
    },
    {
      id: "gear-2",
      x: 0.73,
      y: 0.41,
      rotation: 0,
    },
    {
      id: "bolt-1",
      x: 0.12,
      y: 0.88,
      rotation: 0,
    },
    {
      id: "bolt-2",
      x: 0.88,
      y: 0.88,
      rotation: 0,
    },
  ];

  const workbenchRef = useRef(null);

  useEffect(() => {
    const updateInitialPositions = () => {
      const workbench = workbenchRef.current;

      if (!workbench) {
        return;
      }

      const rect = workbench.getBoundingClientRect();

      setPieces((currentPieces) =>
        currentPieces.map((piece) => {
          const initial = initialPiecePositions.find(
            (item) => item.id === piece.id
          );

          if (!initial) {
            return piece;
          }

          return {
            ...piece,
            x: rect.width * initial.x,
            y: rect.height * initial.y,
            rotation: initial.rotation,
          };
        })
      );
    };

    updateInitialPositions();

    window.addEventListener("resize", updateInitialPositions);

    return () => {
      window.removeEventListener("resize", updateInitialPositions);
    };
  }, []);

  const movePiece = (id, x, y) => {
    setPieces((currentPieces) =>
      currentPieces.map((piece) =>
        piece.id === id
          ? {
              ...piece,
              x,
              y,
            }
          : piece
      )
    );
  };

  const rotatePiece = (id) => {
    setPieces((currentPieces) =>
      currentPieces.map((piece) =>
        piece.id === id
          ? {
              ...piece,
              rotation: piece.rotation + 45,
            }
          : piece
      )
    );
  };

  const resetPieces = () => {
    const workbench = workbenchRef.current;

    if (!workbench) {
      return;
    }

    const rect = workbench.getBoundingClientRect();

    setPieces((currentPieces) =>
      currentPieces.map((piece) => {
        const initial = initialPiecePositions.find(
          (item) => item.id === piece.id
        );

        if (!initial) {
          return piece;
        }

        return {
          ...piece,
          x: rect.width * initial.x,
          y: rect.height * initial.y,
          rotation: initial.rotation,
        };
      })
    );
  };

  const addPiece = () => {
    const workbench = workbenchRef.current;

    if (!workbench) {
      return;
    }

    const rect = workbench.getBoundingClientRect();

    const availablePieces = [
      {
        type: "beam",
        holes: 4,
      },
      {
        type: "beam",
        holes: 5,
      },
      {
        type: "beam",
        holes: 6,
      },
      {
        type: "red-beam",
        holes: 4,
      },
      {
        type: "red-beam",
        holes: 5,
      },
      {
        type: "gear",
        size: "size-10",
      },
      {
        type: "gear",
        size: "size-12",
      },
      {
        type: "gear",
        size: "size-14",
        reverse: true,
      },
      {
        type: "bolt",
        size: "size-6",
      },
      {
        type: "bolt",
        size: "size-7",
      },
      {
        type: "red-bolt",
        size: "size-7",
      },
    ];

    const selected =
      availablePieces[
        Math.floor(Math.random() * availablePieces.length)
      ];

    const id = `piece-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    const padding = 45;

    const x =
      padding +
      Math.random() * Math.max(0, rect.width - padding * 2);

    const y =
      padding +
      Math.random() * Math.max(0, rect.height - padding * 2);

    const rotation = Math.floor(Math.random() * 8) * 45;

    setPieces((currentPieces) => [
      ...currentPieces,
      {
        id,
        ...selected,
        x,
        y,
        rotation,
      },
    ]);
  };

  const startBuild = () => {
    if (isBuilding) {
      return;
    }

    const available = BUILDS.filter(
      (item) => item.type !== build?.type
    );

    const next =
      available[Math.floor(Math.random() * available.length)];

    setBuild(null);
    setIsBuilding(true);

    window.setTimeout(() => {
      setBuild(next);
      setBuildNumber((number) => number + 1);
      setIsBuilding(false);
    }, 1200);
  };

  const renderDraggablePiece = (piece) => {
    switch (piece.type) {
      case "beam":
        return (
          <MetalBeam
            className="relative left-0 top-0 h-5 w-36"
            holes={piece.holes}
          />
        );

      case "red-beam":
        return (
          <MetalBeam
            className="relative left-0 top-0 h-5 w-32"
            holes={piece.holes}
            red
          />
        );

      case "gear":
        return (
          <Gear
            className="relative left-0 top-0"
            size={piece.size}
            reverse={piece.reverse}
            spinning={false}
          />
        );

      case "bolt":
        return (
          <Bolt
            className={`relative left-0 top-0 ${piece.size}`}
          />
        );

      case "red-bolt":
        return (
          <Bolt
            className={`relative left-0 top-0 ${piece.size}`}
            red
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden border-b border-line bg-grid px-4 py-8 md:px-8">
      {/* Background */}
      <div className="hero-spotlight hero-spotlight-1" />
      <div className="hero-spotlight hero-spotlight-2" />
      <div className="hero-spotlight hero-spotlight-3" />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        {/* Status */}
        <div className="mb-5 flex justify-center">
          <span className="flex items-center gap-2 rounded-full border border-red-500 bg-red-600/25 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-red-100 shadow-[0_0_20px_rgba(220,38,38,.2)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,.8)]" />
            Build failed / 404
          </span>
        </div>

        {/* 404 */}
        <h1 className="text-[7rem] font-extrabold leading-[0.8] tracking-[-0.08em] text-foreground sm:text-[7rem]">
          4
          <span className="bg-gradient-to-r from-red-800 to-red-500 bg-clip-text text-transparent">
            0
          </span>
          4
        </h1>

        {/* Message */}
        <h2 className="mt-5 text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Uh-oh. This build didn&apos;t quite go to plan.
        </h2>

        <p className="mx-auto mt-2 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Looks like we&apos;ve got a few parts missing.
          <br className="hidden sm:block" />
          <span className="text-foreground">
            Let&apos;s build something instead.
          </span>
        </p>

        {/* =====================================================
            WORKBENCH
        ===================================================== */}

        <div
          ref={workbenchRef}
          className="relative mx-auto mt-5 h-[250px] w-full max-w-[600px] overflow-hidden sm:mt-7 sm:h-[290px]"
        >
          <div className="absolute bottom-5 left-1/2 h-8 w-[75%] -translate-x-1/2 rounded-full bg-red-500/10 blur-2xl" />

          {/* Loose / draggable parts */}
          {!build && !isBuilding && (
            <>
              {pieces.map((piece) => (
                <DraggablePiece
                  key={piece.id}
                  id={piece.id}
                  x={piece.x}
                  y={piece.y}
                  rotation={piece.rotation}
                  onMove={movePiece}
                  onRotate={rotatePiece}
                  containerRef={workbenchRef}
                >
                  {renderDraggablePiece(piece)}
                </DraggablePiece>
              ))}

              <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-white/75">
                Drag parts to build • Double-click to rotate • Add parts below
              </div>
            </>
          )}

          {/* Assembly animation */}
          {isBuilding && !build && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative size-28">
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-dashed border-red-500/40" />

                <div className="absolute inset-4 animate-[gearSlow_2s_linear_infinite] rounded-full border-8 border-[#777c80] bg-[#222527]" />

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] font-bold uppercase tracking-widest text-white">
                  BUILD
                </div>
              </div>
            </div>
          )}

          {/* Finished build - every individual part is draggable */}
          {build && (
            <DraggableFinishedBuild
              key={buildNumber}
              type={build.type}
              buildNumber={buildNumber}
            />
          )}

          {/* Label */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.2em] text-red-500/60">
            {build
              ? `BUILD COMPLETE // ${build.name}`
              : isBuilding
                ? "ASSEMBLY IN PROGRESS // PLEASE STAND BY"
                : "PARTS READY // AWAITING BUILDER"}
          </div>
        </div>

        {/* Result */}
        <div className="mx-auto min-h-[58px] max-w-xl">
          {build ? (
            <div
              key={buildNumber}
              className="animate-[resultPop_0.4s_ease-out]"
            >
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] px-4 py-3">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-emerald-400">
                  ✓ Assembly complete
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {build.icon}{" "}
                  <span className="font-semibold text-foreground">
                    {build.name}
                  </span>{" "}
                  — {build.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-2 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                <span className="text-red-500">●</span>{" "}
                Page missing
                <span className="mx-3 text-white/20">|</span>
                <span className="text-yellow-500">●</span>{" "}
                Parts available
                <span className="mx-3 text-white/20">|</span>
                <span className="text-emerald-500">●</span>{" "}
                Builder required
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={startBuild}
            disabled={isBuilding}
            className="group mt-2 inline-flex cursor-pointer items-center gap-3 rounded-md border border-red-400/50 bg-gradient-to-b from-red-600 to-red-800 px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_25px_rgba(220,38,38,.35)] transition-all hover:-translate-y-1 hover:brightness-110 hover:shadow-[0_0_40px_rgba(220,38,38,.55)] disabled:cursor-wait disabled:opacity-70"
          >
            <span className="text-base transition-transform duration-300 group-hover:rotate-180">
              ⚙
            </span>

            {isBuilding
              ? "Assembling..."
              : build
                ? "Build Another"
                : "Build It!"}
          </button>

          {!build && !isBuilding && (
            <>
              <button
                type="button"
                onClick={addPiece}
                className="ml-2 mt-2 inline-flex cursor-pointer items-center gap-2 rounded-md border border-red-400/30 bg-red-500/[0.08] px-4 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-red-300 transition-all hover:-translate-y-0.5 hover:border-red-400/60 hover:bg-red-500/[0.15] hover:text-white"
              >
                + Add Part
              </button>

              <button
                type="button"
                onClick={resetPieces}
                className="ml-2 mt-2 inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-4 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                ↻ Reset Parts
              </button>
            </>
          )}
        </div>

        {/* Build controls */}
        <div className="mt-7 flex flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-red-400/40 bg-gradient-to-b from-red-700 to-red-800 px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-[0_0_25px_rgba(220,38,38,.35)] transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_35px_rgba(220,38,38,.5)]"
          >
            Back to home
          </Link>

          <Link
            href="/discover"
            className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-surface px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-red-500/60 hover:bg-black hover:text-white hover:shadow-[0_0_25px_rgba(220,38,38,.2)]"
          >
            Explore Meccano
          </Link>
        </div>

        {build && (
          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            Not quite the page you were looking for... but at least we built a{" "}
            {build.name.toLowerCase()}.
          </p>
        )}

        {/* Footer */}
        <div className="mx-auto mt-10 max-w-md border-t border-line pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            404 // Build incomplete // Return to assembly
          </p>
        </div>
      </div>

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style jsx>{`
        @keyframes gearSlow {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gearReverse {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes wheelSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes resultPop {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(8px);
          }

          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </main>
  );
}