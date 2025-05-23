import React from "react";

const EchoPlanLogo: React.FC = () => (
  <div className="flex items-center gap-1">
    {/* Logo Icon */}
    <EchoPlanIcon className="size-8 p-1 text-secondary rounded-full bg-primary/90" />
    <div className="flex items-center font-bold text-xl gap-0.5">
      <span className="text-primary">Echo</span>
      <span>Plan</span>
    </div>
  </div>
);

const EchoPlanIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M2 10v3" />
    <path d="M6 6v11" />
    <path d="M10 3v18" />
    <path d="M14 8v7" />
    <path d="M18 5v13" />
    <path d="M22 10v3" />
  </svg>
);

export { EchoPlanIcon };
export default EchoPlanLogo;
