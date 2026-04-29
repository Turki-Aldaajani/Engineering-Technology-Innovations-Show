import {
  useQuery,
  useMutation,
  type UseQueryOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import {
  CreateRegistrationRequest,
  type CreateRegistrationInput,
  type Registration,
  type Booth,
} from "@workspace/api-zod";

export type { Registration, Booth, CreateRegistrationInput };

// ── Fetch helper ──────────────────────────────────────────────────────────────

interface ApiError extends Error {
  status: number;
  data: unknown;
}

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  let data: unknown;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    const err = Object.assign(new Error(`HTTP ${res.status}`), {
      status: res.status,
      data,
    }) as ApiError;
    throw err;
  }
  return data as T;
}

// ── Request options ───────────────────────────────────────────────────────────

interface RequestOptions {
  headers?: Record<string, string>;
}

// ── useListBooths ─────────────────────────────────────────────────────────────

export function useListBooths(opts?: {
  query?: Partial<UseQueryOptions<Booth[]>>;
  request?: RequestOptions;
}) {
  return useQuery<Booth[]>({
    queryKey: ["/api/booths"],
    queryFn: () =>
      apiFetch<Booth[]>("/api/booths", { headers: opts?.request?.headers }),
    ...opts?.query,
  });
}

// ── useListRegistrations ──────────────────────────────────────────────────────

export function useListRegistrations(opts?: {
  query?: Partial<UseQueryOptions<Registration[]>>;
  request?: RequestOptions;
}) {
  return useQuery<Registration[]>({
    queryKey: ["/api/registrations"],
    queryFn: () =>
      apiFetch<Registration[]>("/api/registrations", {
        headers: opts?.request?.headers,
      }),
    ...opts?.query,
  });
}

// ── useCreateRegistration ─────────────────────────────────────────────────────

type CreateRegistrationVars = { data: CreateRegistrationInput };

export function useCreateRegistration(opts?: {
  mutation?: Partial<
    UseMutationOptions<Registration, unknown, CreateRegistrationVars>
  >;
}) {
  return useMutation<Registration, unknown, CreateRegistrationVars>({
    mutationFn: ({ data }) => {
      const parsed = CreateRegistrationRequest.parse(data);
      return apiFetch<Registration>("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
    },
    ...opts?.mutation,
  });
}
