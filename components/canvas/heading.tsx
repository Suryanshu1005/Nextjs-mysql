interface HeadingProps {
    title: String,
}

export const Heading: React.FC<HeadingProps> = ({
    title,
}) => {
    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight mb-10 ml-5">
                {title}
            </h2>
        </div>
    )

}