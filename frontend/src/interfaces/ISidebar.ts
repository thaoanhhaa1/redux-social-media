interface ISidebar {
    icon: ({ className }: { className?: string | undefined }) => JSX.Element;
    title: string;
    link: string;
}

export default ISidebar;
