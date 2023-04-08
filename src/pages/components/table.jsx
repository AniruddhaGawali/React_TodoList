import React, { useState } from "react";
import ProTable from "@ant-design/pro-table";

const Table = ({ todos, remove }) => {
  const [keywords, setKeywords] = useState("");

  const columns = [
    {
      title: "Title",
      dataIndex: "text",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Desc",
      dataIndex: "desc",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      render: (text, row, index, action) => {
        const d = new Date(row.dueDate);
        return (
          <span>
            {`${d.getHours()}:${d.getMinutes()} ${d.getDate()}/${d.getMonth()}/${d.getFullYear()} `}
          </span>
        );
      },
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (text, row, index, action) => {
        return (
          <div>
            {row.tag.map((tag) => (
              <span
                className="mx-1 bg-slate-200 p-1 px-2 rounded-2xl"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        );
      },
    },

    {
      title: "option",
      valueType: "option",
      dataIndex: "id",
      render: (text, row, index, action) => [
        <a
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this item?")) {
              remove(row);
            }
          }}
        >
          🗑️ Delete
        </a>,
      ],
    },
  ];

  return (
    <>
      <ProTable
        columns={columns}
        dataSource={todos}
        rowKey="name"
        params={{ keywords }}
        style={{
          marginTop: "10vh",
          width: "90%",
        }}
        pagination={{
          defaultCurrent: 10,
        }}
      />
    </>
  );
};

export default Table;
