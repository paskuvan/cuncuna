'use client';

import { obtenerSeleccionPlan } from './seleccion-plan-local';

export const PLAN_GRATIS = 'gratis';
export const PLAN_PLUS = 'plus';
export const PLAN_FAMILIA = 'familia';

const LECCIONES_GRATIS = new Set(['l0-1', 'l0-2', 'l0-3', 'l1-1', 'l1-2']);

export const PLANES_ACCESO = {
  gratis: {
    id: PLAN_GRATIS,
    nombre: 'Gratis',
    color: '#FFFFFF',
    descripcion: 'Introducción y primeras lecciones para empezar.',
  },
  plus: {
    id: PLAN_PLUS,
    nombre: 'Plus',
    color: '#FFD23F',
    descripcion: 'Curso completo individual.',
  },
  familia: {
    id: PLAN_FAMILIA,
    nombre: 'Familia',
    color: '#4ECDC4',
    descripcion: 'Curso completo y perfiles familiares.',
  },
};

export function obtenerPlanActual() {
  const seleccion = obtenerSeleccionPlan();
  const plan = seleccion?.plan;

  if (plan === PLAN_PLUS || plan === PLAN_FAMILIA) {
    return {
      ...PLANES_ACCESO[plan],
      periodo: seleccion.periodo,
      estado: seleccion.estado,
    };
  }

  return {
    ...PLANES_ACCESO[PLAN_GRATIS],
    periodo: null,
    estado: 'activo',
  };
}

export function esPlanPagado(planId) {
  return planId === PLAN_PLUS || planId === PLAN_FAMILIA;
}

export function puedeAccederLeccion(leccionId, plan = obtenerPlanActual()) {
  if (esPlanPagado(plan.id)) return true;
  return LECCIONES_GRATIS.has(leccionId);
}

export function obtenerRequisitoLeccion(leccionId) {
  if (LECCIONES_GRATIS.has(leccionId)) return PLAN_GRATIS;
  return PLAN_PLUS;
}
