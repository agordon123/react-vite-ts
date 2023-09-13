// file: Item.behavior.test.tsx
import { render, fireEvent, prettyDOM } from "@testing-library/react";
// import reference to our interface
import { ItemInterface } from "@/models/items/item.interface"; // import reference to your Item component:
import { ItemComponent } from "./Item.component";


// describe our test suite
describe("Item.component: behavior", () => {
  // test our component click event
  it("click event invokes onItemSelect handler as expected", () => {
    const model: ItemInterface = {
      id: 1,
      name: "Unit test item 1",
      selected: false,
    };
    // create a spy function with vitest.fn()
    const onItemSelect = vitest.fn();
    const testid = "unit-test-item";
    // render our component
    const { container } = render(
      <ItemComponent
        testid={testid}
        model={model}
        onItemSelect={onItemSelect}
      />
    );
    // get a reference to the <li> element
    const liElement = container.firstChild as HTMLElement; // fire click
    fireEvent.click(liElement);
    // check test result expect(onItemSelect).toHaveBeenCalledTimes(1)
  });
});
