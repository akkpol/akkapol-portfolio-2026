"use client";

import React from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";

export type WorkflowStage = {
  id: string;
  step: string;
  label: string;
  title: string;
  description: string;
  event: string;
  guard: string;
};

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-amber-300"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export function SystemRadar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute left-[12%] top-[18%] h-64 w-64 rounded-full border border-amber-300/15"
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-0 h-16 w-px bg-amber-300/45" />
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300" />
      </motion.div>
      <div className="absolute inset-x-8 bottom-28 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
      <div className="absolute bottom-16 right-8 h-24 w-px bg-gradient-to-b from-transparent via-amber-300/35 to-transparent" />
    </div>
  );
}

export function WorkflowPreview({ stages }: { stages: WorkflowStage[] }) {
  const [activeId, setActiveId] = React.useState(stages[0].id);
  const activeStage = stages.find((stage) => stage.id === activeId) ?? stages[0];

  return (
    <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {stages.map((stage) => {
          const selected = stage.id === activeId;

          return (
            <motion.button
              key={stage.id}
              type="button"
              onClick={() => setActiveId(stage.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden border p-4 text-left transition ${
                selected
                  ? "border-amber-300/55 bg-amber-300/[0.11] text-white"
                  : "border-white/10 bg-white/[0.035] text-zinc-300 hover:border-amber-300/25 hover:bg-white/[0.06]"
              }`}
            >
              {selected ? (
                <motion.span
                  layoutId="active-workflow-stage"
                  className="absolute inset-y-0 left-0 w-1 bg-amber-300"
                />
              ) : null}
              <span className="text-xs font-semibold text-amber-200">{stage.step}</span>
              <span className="ml-3 text-sm font-semibold">{stage.label}</span>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{stage.title}</p>
            </motion.button>
          );
        })}
      </div>

      <div className="relative overflow-hidden border border-amber-300/18 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 backdrop-blur md:p-8">
        <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative"
        >
          <p className="text-sm font-semibold text-amber-200">
            {activeStage.step} / {activeStage.label}
          </p>
          <h3 className="mt-4 max-w-2xl text-3xl font-semibold text-white md:text-5xl">
            {activeStage.title}
          </h3>
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
            {activeStage.description}
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-black/25 p-4">
              <p className="text-xs font-semibold uppercase text-zinc-500">Event</p>
              <p className="mt-2 break-words font-mono text-sm text-amber-100">
                {activeStage.event}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/25 p-4">
              <p className="text-xs font-semibold uppercase text-zinc-500">Guard</p>
              <p className="mt-2 text-sm leading-6 text-zinc-200">
                {activeStage.guard}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
