import { useEffect, useState } from "react";

const { VITE_API_URL } = import.meta.env;

function InventoryPage() {
  const columns = 6;
  const rows = 4;
  const totalSlots = columns * rows;

  const [error, setError] = useState();

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Koidulaulik",
      image: "/koidulaulik.png",
      quantity: 1,
      description:
        "Koidulaulik is a unique item that grants the player the ability to see hidden paths in the game world. It is said to be imbued with the spirit of the ancient poet Lydia Koidula, and its melodies can reveal secrets that are otherwise invisible.",
    },
    {
      id: 2,
      name: "Fragment",
      image: "/enterButton.svg",
      quantity: 3,
      description:
        "A mysterious fragment that seems to resonate with ancient energy. It is believed to be a piece of a larger artifact, and collecting multiple fragments may unlock powerful abilities or hidden lore within the game.",
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}inventory/user/${1}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          const errorMessage = await response.text();
          setError({
            title: "Problems with backend",
            message: errorMessage || "Invalid email or password.",
          });
          return;
        }

        console.log(data);
        setActivity(data);
      } catch (error) {
        console.log(error);
        setError({
          title: "Server Unreachable",
          message: "Failed to add user, please try again later.",
        });
        return;
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center h-dvh overflow-hidden">
      <div className="flex flex-col items-center bg-lightbrown mb-10 m-30 rounded-lg max-w-430 p-10 pt-0 gap-4">
        <div className="bg-darkbrown p-8 text-center rounded-b-lg">
          <h1 className="h1 text-4xl font-bold text-lightbrown">Inventory</h1>
        </div>
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${columns}, 120px)`,
          }}
        >
          {Array.from({ length: totalSlots }).map((_, index) => {
            const item = items[index];

            return (
              <div
                key={index}
                className="w-30 h-30 bg-lightbrown border-3 border-darkbrown rounded-lg flex items-center justify-center relative"
                onClick={
                  item
                    ? () => setSelectedItem(item)
                    : () => setSelectedItem(null)
                }
              >
                {item && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-25 h-25 object-contain"
                  />
                )}
                {item && (
                  <p className="absolute right-1 bottom-1 bg-darkbrown text-lightbrown px-1 rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {item.quantity}
                  </p>
                )}
                {selectedItem === item && (
                  <div className="w-100 absolute bg-darkbrown p-4 rounded-lg mt-4 left-1/2 transform -translate-x-1/2 top-full z-10">
                    <p className="text-lightbrown">
                      {selectedItem.description}
                    </p>
                    <button className="bg-lightbrown text-darkbrown w-full p-2 rounded-md mt-4">
                      Use
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
