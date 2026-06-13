import { memo } from 'react'

const SectionHeader = memo(({ title, className = '' }) => (
  <div className={`bg-[#00698c] text-white rounded-lg px-4 py-3 mb-4 ${className}`}>
    <h2 className="text-base font-bold">{title}</h2>
  </div>
))

SectionHeader.displayName = 'SectionHeader'

export default SectionHeader
