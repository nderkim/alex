import express from "express";

export const check: (autoApply: boolean) => Promise<void>;
export const router: express.Router;
