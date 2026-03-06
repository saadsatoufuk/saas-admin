"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    debounceMs?: number;
    className?: string;
}

export function SearchInput({
    placeholder = "بحث...",
    onSearch,
    debounceMs = 300,
    className = "",
}: SearchInputProps) {
    const [query, setQuery] = useState("");

    const debouncedSearch = useCallback(
        (() => {
            let timer: NodeJS.Timeout;
            return (value: string) => {
                clearTimeout(timer);
                timer = setTimeout(() => onSearch(value), debounceMs);
            };
        })(),
        [onSearch, debounceMs]
    );

    useEffect(() => {
        debouncedSearch(query);
    }, [query, debouncedSearch]);

    return (
        <div className={`relative ${className}`}>
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pr-10 pl-9 py-2.5 bg-surface border border-border rounded-lg text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none transition-colors"
            />
            {query && (
                <button
                    onClick={() => setQuery("")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
