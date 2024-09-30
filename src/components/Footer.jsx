import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer() {
  const year = new Date().getFullYear();
  const brandName = "AG Solutions";
  const brandLink = "https://www.ag-solutions.in";

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2">
        <Typography variant="small" className="font-normal text-inherit">
          Copyright@ 2024-25 by{" "}
          <a
            href={brandLink}
            target="_blank"
            className="transition-colors hover:text-blue-500 font-bold"
          >
            {brandName}
          </a>{" "}
          . All rights reserved.
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
