/* stylelint-disable custom-property-empty-line-before */
<!-- eslint-disable vue-a11y/form-has-label -->
<template>
  <div class="content content-styleguide">
    <h1>MLTSHP Styleguide</h1>
    <p>
      Below is just about everything you’ll need to style in the app. Check the
      source code to see the many embedded elements within paragraphs.
    </p>
    <hr />
    <h1 id="heading1">Heading 1</h1>
    <h2 id="heading2">Heading 2</h2>
    <h3 id="heading3">Heading 3</h3>
    <h4 id="heading4">Heading 4</h4>
    <h5 id="heading5">Heading 5</h5>
    <h6 id="heading6">Heading 6</h6>
    <hr />
    <p>
      Lorem ipsum dolor sit amet, <a title="test link" href="#">test link</a>.
      <strong>This is strong.</strong> Nullam dignissim convallis est.
      <em>This is emphasized.</em> Donec faucibus. Nunc iaculis suscipit dui.
      5<sup>3</sup> = 125. Water is H<sub>2</sub>O. Nam sit amet sem. Aliquam
      libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl.
      <cite>The New York Times</cite> (That’s a citation). <u>Underline.</u>
      Maecenas ornare tortor. Donec sed tellus eget sapien fringilla nonummy.
      Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat
      in, nunc. Morbi imperdiet augue quis tellus.
    </p>
    <p>
      <abbr title="Hyper Text Markup Language">HTML</abbr> and
      <abbr title="Cascading Style Sheets">CSS</abbr> are our tools. Mauris a
      ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc.
      Morbi imperdiet augue quis tellus. Praesent mattis, massa quis luctus
      fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus. To
      copy a file type <code>COPY <var>filename</var></code
      >. <del>Dinner’s at 5:00.</del> <ins>Let’s make that 7.</ins> This
      <s>text</s> has been struck.
    </p>
    <hr />
    <h2 id="font-features">Font-Features</h2>
    <p>
      We apply some font-features such as ligatures and kerning to headlines.
      Here's an example that should have it applied.
    </p>
    <h1>LYoWAT - ff fi fl ffi Th</h1>
    <h2>LYoWAT - ff fi fl ffi Th</h2>
    <h3>LYoWAT - ff fi fl ffi Th</h3>
    <p>
      Note that these features are not available in every font. In particular,
      our headlines use the system font stack, and these rules don't seem to
      have any affect on the Mac system font.
    </p>
    <hr />
    <h2 id="media">Media</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore.
    </p>
    <h3 id="bigimage">Big Image</h3>
    <p>
      <img
        src="https://www.maxim.com/.image/w_1920/MTM1MTQzNDUwMjE4ODY3MzMx/classic-ferraris.jpg"
        alt="Test Image"
      />
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur.
    </p>
    <h3 id="smallimage">Small Image</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore.
    </p>
    <p>
      <img
        src="https://www.maxim.com/.image/w_320/MTQwODY4NDA5Njk2MDY4OTg0/2014-ferrari-laferrari-red-1png.jpg"
        alt="Small Test Image"
      />
    </p>
    <p>Labore et dolore.</p>
    <hr />
    <h2 id="listtypes">List Types</h2>
    <h3 id="definitionlist">Definition List</h3>
    <dl>
      <dt>Definition List Title</dt>
      <dd>This is a definition list division.</dd>
      <dt>Definition</dt>
      <dd>
        An exact statement or description of the nature, scope, or meaning of
        something:
        <em>our definition of what constitutes poetry.</em>
      </dd>
    </dl>
    <h3 id="orderedlist">Ordered List</h3>
    <ol>
      <li>List Item 1</li>
      <li>
        List Item 2
        <ol>
          <li>Nested list item A</li>
          <li>Nested list item B</li>
        </ol>
      </li>
      <li>List Item 3</li>
    </ol>
    <h3 id="unorderedlist">Unordered List</h3>
    <ul>
      <li>List Item 1</li>
      <li>
        List Item 2
        <ul>
          <li>Nested list item A</li>
          <li>Nested list item B</li>
        </ul>
      </li>
      <li>List Item 3</li>
    </ul>
    <hr />
    <h2 id="table">Table</h2>
    <table>
      <tr>
        <th>&nbsp;</th>
        <th>Enterprise</th>
        <th>Enterprise D</th>
        <th>Galactica</th>
      </tr>
      <tr>
        <th>Captain</th>
        <td>James Kirk</td>
        <td>Jean-Luc Picard</td>
        <td>William Adama</td>
      </tr>
      <tr>
        <th>XO</th>
        <td>Spock</td>
        <td>William Riker</td>
        <td>Saul Tigh</td>
      </tr>
      <tr>
        <th>Doctor</th>
        <td>Leonard McCoy</td>
        <td>Beverly Crusher</td>
        <td>Doc Cottle</td>
      </tr>
      <tr>
        <th>Engineer</th>
        <td>Montgomery Scott</td>
        <td>Geordi LaForge</td>
        <td>Galen Tyrol</td>
      </tr>
    </table>

    <hr />
    <h2 id="preformattedtext">Preformatted Text</h2>
    <p>
      Typographically, preformatted text is not the same thing as code.
      Sometimes, a faithful execution of the text requires preformatted text
      that may not have anything to do with code. For example:
    </p>
    <pre>
“Beware the Jabberwock, my son!
The jaws that bite, the claws that catch!
Beware the Jubjub bird, and shun
The frumious Bandersnatch!”
</pre
    >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore.
    </p>
    <pre>
! " # $ % &amp; ' ( ) * + , - . /
0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ?
@ A B C D E F G H I J K L M N O
P Q R S T U V W X Y Z [ \ ] ^ _
` a b c d e f g h i j k l m n o
p q r s t u v w x y z { | } ~
</pre
    >
    <h3 id="code">Code</h3>
    <p>
      Code can be presented inline, like
      <code>&lt;?php bloginfo('stylesheet_url'); ?&gt;</code>, or within a
      <code>&lt;pre&gt;</code> block.
    </p>
    <pre><code>#container {
    float: left;
    margin: 0 -240px 0 0;
    width: 100%;
}
</code></pre>
    <hr />
    <h2 id="figures">Figures</h2>
    <p>Figures are usually used to refer to images:</p>
    <figure>
      <img alt="" src="http://lorempixel.com/1280/720/abstract/?r" />
      <figcaption>
        <h4>Figure Heading</h4>
        <p>This is a placeholder image, with supporting caption.</p>
      </figcaption>
    </figure>
    <p>Here, a part of a poem is marked up using figure:</p>
    <figure>
      <p>
        &#8216;Twas brillig, and the slithy toves <br />Did gyre and gimble in
        the wabe; <br />All mimsy were the borogoves, <br />And the mome raths
        outgrabe.
      </p>
      <figcaption>
        <small
          ><cite>Jabberwocky</cite> (first verse). Lewis Carroll, 1832-98</small
        >
      </figcaption>
    </figure>
    <hr />
    <h2 id="blockquotes">Blockquotes</h2>
    <p>
      Let’s keep it simple. Italics are good to help set it off from the body
      text. Be sure to style the citation.
    </p>
    <blockquote>
      <p>
        Good afternoon, gentlemen. I am a HAL 9000 computer. I became
        operational at the H.A.L. plant in Urbana, Illinois on the 12th of
        January 1992. My instructor was Mr. Langley, and he taught me to sing a
        song. If you’d like to hear it I can sing it for you.
        <cite
          >— <a href="https://en.wikipedia.org/wiki/HAL_9000">HAL 9000</a></cite
        >
      </p>
    </blockquote>
    <p>And here’s a bit of trailing text.</p>
    <hr />
    <h2 id="textlevelsemantics">Text-level semantics</h2>
    <p>
      The <a href="#">a element</a> example <br />
      The <abbr>abbr element</abbr> and
      <abbr title="Title text">abbr element with title</abbr> examples <br />
      The <b>b element</b> example <br />
      The <cite>cite element</cite> example <br />
      The <code>code element</code> example <br />
      The <del>del element</del> example <br />
      The <dfn>dfn element</dfn> and
      <dfn title="Title text">dfn element with title</dfn> examples <br />
      The <em>em element</em> example <br />
      The <i>i element</i> example <br />
      The <ins>ins element</ins> example <br />
      The <kbd>kbd element</kbd> example <br />
      The <mark>mark element</mark> example <br />
      The <q>q element <q>inside</q> a q element</q> example <br />
      The <s>s element</s> example <br />
      The <samp>samp element</samp> example <br />
      The <small>small element</small> example <br />
      The <span>span element</span> example <br />
      The <strong>strong element</strong> example <br />
      The <sub>sub element</sub> example <br />
      The <sup>sup element</sup> example <br />
      The <var>var element</var> example <br />
      The <u>u element</u> example
    </p>
    <hr />
    <h2 id="forms">Forms</h2>
    <form>
      <fieldset>
        <legend>Fieldset Legend</legend>
        <div class="field">
          <label for="ex-text">Text input</label>
          <input id="ex-text" type="text" value="default value" />
        </div>
        <div class="field">
          <label for="ex-email">Email input</label>
          <input id="ex-email" type="email" />
        </div>
        <div class="field">
          <label for="ex-search">Search input</label>
          <input id="ex-search" type="search" />
        </div>
        <div class="field">
          <label for="ex-tel">Tel input</label>
          <input id="ex-tel" type="tel" />
        </div>
        <div class="field">
          <label for="ex-url">URL input</label>
          <input id="ex-url" type="url" placeholder="http://" />
        </div>
        <div class="field">
          <label for="ex-password">Password input</label>
          <input id="ex-password" type="password" value="password" />
        </div>
        <div class="field">
          <label for="ex-file">File input</label>
          <input id="ex-file" type="file" />
        </div>
        <div class="field field-radio">
          <input id="ex-radio" type="radio" name="rad" />
          <label for="ex-radio">Radio input</label>
        </div>
        <div class="field field-checkbox">
          <input id="ex-checkbox" type="checkbox" />
          <label for="ex-checkbox">Checkbox input</label>
        </div>
        <div class="field">
          <label for="ex-select">Select field</label>
          <div class="field-input">
            <select id="ex-select">
              <option>Option 01</option>
              <option>Option 02</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label for="ex-textarea">Textarea</label>
          <textarea id="ex-textarea">Textarea text</textarea>
        </div>
      </fieldset>
      <fieldset>
        <legend>Clickable inputs and buttons</legend>
        <input type="reset" value="Reset (input)" />
        <input type="button" value="Button (input)" />
        <input type="submit" value="Submit (input)" />
        <button type="button">Button (button)</button>
      </fieldset>
      <fieldset id="boxsize">
        <legend>box-sizing tests</legend>
        <div>
          <input type="text" value="text" />
        </div>
        <div>
          <input type="email" value="email" />
        </div>
        <div>
          <input type="search" value="search" />
        </div>
        <div>
          <input type="url" value="http://example.com" />
        </div>
        <div>
          <input type="password" value="password" />
        </div>
        <div>
          <input type="color" value="#000000" />
        </div>
        <div>
          <input type="number" value="5" />
        </div>
        <div>
          <input type="range" value="10" />
        </div>
        <div>
          <input type="date" value="1970-01-01" />
        </div>
        <div>
          <input type="month" value="1970-01" />
        </div>
        <div>
          <input type="week" value="1970-W01" />
        </div>
        <div>
          <input type="time" value="18:23" />
        </div>
        <div>
          <input type="datetime" value="1970-01-01T00:00:00Z" />
        </div>
        <div>
          <input type="datetime-local" value="1970-01-01T00:00" />
        </div>
        <div>
          <input type="radio" />
        </div>
        <div>
          <input type="checkbox" />
        </div>
        <div>
          <select>
            <option>Option 01</option>
            <option>Option 02</option>
          </select>
        </div>
        <div>
          <textarea cols="30" rows="5">Textarea text</textarea>
        </div>
        <div>
          <input type="reset" value="Reset (input)" />
        </div>
        <div>
          <input type="button" value="Button (input)" />
        </div>
        <div>
          <input type="submit" value="Submit (input)" />
        </div>
        <div>
          <button type="button">Button (button)</button>
        </div>
      </fieldset>
    </form>
    <hr />
    <h2 id="funform">Fun Form</h2>
    <div class="fun-form">
      <form>
        <div class="field">
          <label for="ex-error">Username:</label>
          <input id="ex-error" class="input-text" type="text" name="name" />
          <div class="error">
            <span class="error-text"> Here's what an error looks like! </span>
          </div>
          <div class="field-help">
            30 characters or fewer. Letters, digits, underscores or dashes only.
          </div>
        </div>
        <div class="field field-submit">
          <input
            class="btn btn-primary btn-shadow btn-large"
            type="submit"
            value="Create It!"
          />
        </div>
      </form>
    </div>
    <hr />
    <h2 id="buttons">Buttons</h2>
    <h3>Button Elements</h3>
    <div class="panel--example">
      <a class="btn btn-secondary" href="#" role="button">Link</a>
      <button class="btn btn-secondary" type="submit">Button</button>
      <input class="btn btn-secondary" type="button" value="Input" />
      <input class="btn btn-secondary" type="submit" value="Submit" />
      <input class="btn btn-secondary" type="reset" value="Reset" />
    </div>
    <h3>New Button Styles</h3>
    <div class="panel--example">
      <button type="button" class="btn btn-primary">Primary</button>
      <button type="button" class="btn btn-secondary">Secondary</button>
      <button type="button" class="btn btn-success">Success</button>
      <button type="button" class="btn btn-warning">Warning</button>
      <button type="button" class="btn btn-danger">Danger</button>
      <button type="button" class="btn btn-primary" disabled>Disabled</button>
    </div>
    <h3>Pastel Button Styles</h3>
    <div class="panel--example">
      <button type="button" class="btn btn-primary btn-pastel">Primary</button>
      <button type="button" class="btn btn-secondary btn-pastel">
        Secondary
      </button>
      <button type="button" class="btn btn-success btn-pastel">Success</button>
      <button type="button" class="btn btn-warning btn-pastel">Warning</button>
      <button type="button" class="btn btn-danger btn-pastel">Danger</button>
      <button type="button" class="btn btn-primary btn-pastel" disabled>
        Disabled
      </button>
    </div>
    <h3>Shadow Button Styles</h3>
    <div class="panel--example">
      <button type="button" class="btn btn-primary btn-shadow">Primary</button>
      <button type="button" class="btn btn-secondary btn-shadow">
        Secondary
      </button>
      <button type="button" class="btn btn-success btn-shadow">Success</button>
      <button type="button" class="btn btn-warning btn-shadow">Warning</button>
      <button type="button" class="btn btn-danger btn-shadow">Danger</button>
      <button type="button" class="btn btn-primary btn-shadow" disabled>
        Disabled
      </button>
    </div>
    <h3>Icon-Only Button Styles</h3>
    <div class="panel--example">
      <button type="button" class="btn btn-primary btn-icon">⭑</button>
      <button type="button" class="btn btn-secondary btn-icon">✔</button>
      <button type="button" class="btn btn-secondary btn-icon btn-shadow">
        ☰
      </button>
      <button type="button" class="btn btn-secondary btn-pastel btn-icon">
        ✕
      </button>
    </div>
    <h3>Padded Button Styles</h3>
    <div class="panel--example">
      <button type="button" class="btn btn-primary btn-padded">Primary</button>
      <button type="button" class="btn btn-secondary btn-padded">
        Secondary
      </button>
      <button type="button" class="btn btn-secondary btn-padded btn-shadow">
        Info
      </button>
      <button type="button" class="btn btn-secondary btn-pastel btn-padded">
        clear all
      </button>
      <button
        type="button"
        class="btn btn-secondary btn-pastel btn-padded btn-icon"
      >
        ✕
      </button>
    </div>
    <h3>Large Button Styles</h3>
    <div class="panel--example">
      <button type="button" class="btn btn-primary btn-large">Primary</button>
      <button type="button" class="btn btn-secondary btn-large">
        Secondary
      </button>
      <button type="button" class="btn btn-secondary btn-large btn-shadow">
        Info
      </button>
      <button type="button" class="btn btn-secondary btn-pastel btn-large">
        clear all
      </button>
      <button
        type="button"
        class="btn btn-secondary btn-pastel btn-large btn-icon"
      >
        ✕
      </button>
    </div>
    <h3>Small Button Styles *</h3>
    <div class="panel--example">
      <button type="button" class="btn btn-primary btn-small">Primary</button>
      <button type="button" class="btn btn-secondary btn-small">
        Secondary
      </button>
      <button type="button" class="btn btn-secondary btn-small btn-shadow">
        Info
      </button>
      <button type="button" class="btn btn-secondary btn-pastel btn-small">
        clear all
      </button>
      <button
        type="button"
        class="btn btn-secondary btn-pastel btn-small btn-icon"
      >
        ✕
      </button>
    </div>
    <h3>Tiny Button Styles *</h3>
    <div class="panel--example">
      <button type="button" class="btn btn-primary btn-tiny">Primary</button>
      <button type="button" class="btn btn-secondary btn-tiny">
        Secondary
      </button>
      <button type="button" class="btn btn-secondary btn-tiny btn-shadow">
        Info
      </button>
      <button type="button" class="btn btn-secondary btn-pastel btn-tiny">
        clear all
      </button>
      <button
        type="button"
        class="btn btn-secondary btn-pastel btn-tiny btn-icon"
      >
        ✕
      </button>
    </div>
    <p>
      <small
        >* Use with caution: these do not meet touch accessibility
        targets</small
      >
    </p>
    <hr />
    <h2 id="embeds">Embeds</h2>
    <p>
      Sometimes all you want to do is embed a little love from another location
      and set your post alive.
    </p>
    <h3 id="youtube">Youtube</h3>
    <p>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat.
    </p>
    <iframe
      width="1280"
      height="720"
      src="https://www.youtube.com/embed/v7MGUNV8MxU"
      frameborder="0"
      allowfullscreen
      title="YouTube Example"
    />
    <p>Culpa qui officia deserunt mollit anim id est laborum.</p>
    <h3 id="vimeo">Vimeo</h3>
    <p>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat.
    </p>
    <iframe
      src="https://player.vimeo.com/video/73295674"
      width="640"
      height="360"
      frameborder="0"
      webkitallowfullscreen
      mozallowfullscreen
      allowfullscreen
      title="Vimeo Example"
    />
    <p>
      <a href="https://vimeo.com/73295674"
        >Dizzee Rascal | I Don&#039;t Need A Reason</a
      >
      from <a href="https://vimeo.com/divisionparis">DIVISION</a> on
      <a href="https://vimeo.com">Vimeo</a>.
    </p>
    <p>Culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Styleguide',
});
</script>
