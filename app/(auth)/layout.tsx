const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-dark">
            {children}
        </div>
    );
}

export default AuthLayout;
