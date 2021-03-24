var fileUtil = require('../helper/fileUtil');
const fs = require("fs");




it("Get file from directory", () => {
 
  let results = ["d:\\todo\\todo1.js"];
  let results2 = ["d:\\todo\\todo1.js","d:\\todo\\todo2.js"];
  fileUtil.getFiles = jest.fn();

  const mock = jest.fn().mockReturnValueOnce(results).mockReturnValueOnce(results2);
  const resultFirst = mock(results);
  const resultSecond = mock(results2);

  expect(resultFirst).toBe(results);
  expect(resultSecond).toBe(results2);
  expect(mock).toHaveBeenCalledTimes(2);
  expect(mock).toHaveBeenNthCalledWith(1, results);
  expect(mock).toHaveBeenNthCalledWith(2, results2);


});



it("Find TODO from list", () => {
  
  let results = ["d:\\todo\\todo1.js"];
  let results2 = ["d:\\todo\\todo1.js","d:\\todo\\todo2.js"];

  fileUtil.findToDo = jest.fn();
  const mock = jest.fn().mockReturnValueOnce(results).mockReturnValueOnce(results2);
  const resultFirst = mock(results);
  const resultSecond = mock(results2);

  expect(resultFirst).toBe(results);
  expect(resultSecond).toBe(results2);
  expect(mock).toHaveBeenCalledTimes(2);
  expect(mock).toHaveBeenNthCalledWith(1, results);
  expect(mock).toHaveBeenNthCalledWith(2, results2);


});
