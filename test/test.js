/* import fs from 'fs';
import { remark } from "remark";
import remarkEmbed from "../index.js";

const buffer = fs.readFileSync("example.md");

remark()
  .use(remarkEmbed)
  .process(buffer)
  .then((file) => {
    //console.error(reporter(file));
    console.log(String(file));
  }); */
import fs from "fs";
import { remark } from "remark";
const doc = fs.readFileSync("test/example.md", "utf8");
import remarkEmbed from "../index.js";

describe("adds headings to the vfile data", () => {
  const result = remark().use(remarkEmbed).processSync(doc);
  console.log(String(result));
});

/* import assert from 'assert';
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
}); */