import { Drawer } from "antd";
import React from "react";

function FilterDrawer({ isOpen, setOpen }: { isOpen: boolean, setOpen: Function }) {
  const onClose = () => {
    setOpen(false);
  };

	return (
		<Drawer
			title="Filter"
			placement="bottom"
			width={500}
      onClose={onClose}
			open={isOpen}
		>
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</Drawer>
	);
}

export default FilterDrawer;
