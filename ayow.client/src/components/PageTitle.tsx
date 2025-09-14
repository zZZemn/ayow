type PageTitleProps = {
    title: string;
};

export default function PageTitle({ title }: PageTitleProps) {
    return <h1 className="text-5xl font-bold text-gray-800">{title}</h1>;
}
