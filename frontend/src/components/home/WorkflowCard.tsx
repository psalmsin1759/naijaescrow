import React, {ReactElement} from 'react'

interface WorkflowProps {
    title: string;
    description: string;
    icon: ReactElement
}
export default function WorkflowCard( { icon, title,description } : WorkflowProps) {
  return (
    <div className="flex flex-col items-start gap-4 bg-white shadow-md p-6 rounded-xl border border-gray-100 hover:shadow-lg transition duration-300">
      <div className="text-primary text-3xl">{icon}</div>
      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
