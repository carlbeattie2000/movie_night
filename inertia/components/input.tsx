interface Props {
  name: string
  type: string
  placeholder: string
  style?: string
}

export default function Input({ name, type, placeholder, style }: Props) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={`w-full bg-zinc-800 text-white text-sm placeholder-zinc-500 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-yellow-400 transition-colors duration-150 ${style}`}
    />
  )
}
