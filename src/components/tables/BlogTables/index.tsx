import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import BlogDetalsPopUp from "./blogDetails";

interface BlogDetails {
  id: string; // Updated to match the API's "_id" field
  name?: string; // Optional, as not all API responses include "name"
  email?: string; // Optional, as not all API responses include "email"
  blogTitle: string; // Mapped from "topic"
  blogContent: string; // Mapped from "content"
  approved: boolean;
  timestamp: string;
}

// Removed hardcoded initialBlogDetails

export default function BlogListTable() {
  const [selectedBlog, setSelectedBlog] = useState<BlogDetails | null>(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [blogDetails, setBlogDetails] = useState<BlogDetails[]>([]);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs");
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          id: item._id,
          name: item.name || "N/A",
          email: item.email || "N/A",
          blogTitle: item.topic,
          blogContent: item.content,
          approved: item.approved,
          timestamp: item.timestamp,
        }));
        setBlogDetails(formattedData);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, []);

  const handleViewDetails = (blogDetail: BlogDetails) => {
    setSelectedBlog(blogDetail);
    setIsPopUpOpen(true);
  };

  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Blog Title
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Approved
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {blogDetails.map((blogDetail) => (
                <TableRow key={blogDetail.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {blogDetail.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {blogDetail.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {blogDetail.blogTitle}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <button
                      className="text-blue-500 hover:underline ml-2"
                      onClick={() => handleViewDetails(blogDetail)}
                    >
                      View
                    </button>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {blogDetail.approved ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {selectedBlog && (
        <BlogDetalsPopUp
          blogDetail={selectedBlog}
          isOpen={isPopUpOpen}
          onClose={handleClosePopUp}
        />
      )}
    </div>
  );
}
