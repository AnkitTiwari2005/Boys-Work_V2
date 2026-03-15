import * as React from "react"

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-surfaceContainerLowest rounded-3xl">
      {icon && <div className="mb-4 text-primary/50">{icon}</div>}
      <h3 className="text-xl font-heading font-bold text-onSurface mb-2">{title}</h3>
      {description && <p className="text-sm font-body text-onSurfaceVariant mb-6 max-w-sm">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  )
}
