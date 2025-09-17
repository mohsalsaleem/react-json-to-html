import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { mount, shallow, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import nock from 'nock';
import JsonTable from '../src/JsonTable';
import JsonToHtml from '../src/JsonToHtml';

configure({ 
  adapter: new Adapter()
});

describe('JsonTable', function() {
  beforeEach(() => {

  });

  it('Basic JsonTable should mount', function() {
    const json = {
      "key": "value"
    }
    const jsonTable = shallow(
      <JsonTable json={json} />
    );
    expect(jsonTable).not.toBe.undefined;
  });

  it('Basic JsonTable with valid indent prop should mount', function() {
    const indent = 6;
    const json = {
      "key": "value"
    }
    const jsonTable = shallow(
      <JsonTable json={json} indent={indent} />
    );
    expect(jsonTable).not.toBe.undefined;
  });

  it('Basic JsonTable with valid css prop should mount', function() {
    const css = {
      rowSpacer: {
        height: '1px'
      }
    }
    const json = {
      "key": "value"
    }
    const jsonTable = shallow(
      <JsonTable json={json} css={css} />
    );
    expect(jsonTable).not.toBe.undefined;
  });

  it('JsonTable with invalid json prop should not mount', function() {
    let json = "invalid data";

    expect(() => {
      shallow(<JsonTable json={json} />);
    }).toThrow();

    json = ["invalid data"];

    expect(() => {
      shallow(<JsonTable json={json} />);
    }).toThrow();

    json = false;

    expect(() => {
      shallow(<JsonTable json={json} />);
    }).toThrow();
  });

  it('JsonTable with valid json and invalid css prop input should not mount', function() {
    let css = "invalid css";
    const json = {
      "key": "value"
    }

    expect(() => {
      shallow(<JsonTable json={json} css={css} />);
    }).toThrow();

    css = ["invalid css"];

    expect(() => {
      shallow(<JsonTable json={json} css={css} />);
    }).toThrow();
  });

  it('JsonTable with valid json and invalid indent prop should not mount', function() {
    let indent = "invalid indent";
    const json = {
      "key": "value"
    }

    expect(() => {
      shallow(<JsonTable json={json} indent={indent} />);
    }).toThrow();

    indent = ["invalid indent"];

    expect(() => {
      shallow(<JsonTable json={json} indent={indent} />);
    }).toThrow();
  });

  it('renders nested objects within a single array entry without [object Object]', function() {
    const json = {
      metadata: [
        {
          id: 'abc-123',
          details: {
            owner: 'Alice',
            tags: ['first', 'second']
          }
        }
      ]
    };

    const html = JsonToHtml.getTable(json);

    expect(html).not.toContain('[object Object]');
    expect(html).toContain('owner');
    expect(html).toContain('Alice');
    expect(html).toContain('tags');
    expect(html).toContain('first');
    expect(html).toContain('second');
  });

  it('renders nested objects within multi-entry arrays without [object Object]', function() {
    const json = {
      people: [
        {
          name: 'Alice',
          contact: {
            email: 'alice@example.com',
            address: {
              city: 'Seattle',
              zip: '98101'
            }
          }
        },
        {
          name: 'Bob',
          contact: {
            email: 'bob@example.com',
            address: {
              city: 'Denver',
              zip: '80202'
            }
          }
        }
      ]
    };

    const wrapper = render(<JsonTable json={json} />);
    const htmlOutput = wrapper.html();

    expect(htmlOutput).not.toContain('[object Object]');
    expect(htmlOutput).toContain('Alice');
    expect(htmlOutput).toContain('alice@example.com');
    expect(htmlOutput).toContain('Bob');
    expect(htmlOutput).toContain('Denver');
  });
});
