import PrismCode from "../../../Components/Common/Prism";

// Default Accordion

const defaultAccordionCode =
`<!-- Base Example -->
    const [openDefault, setOpenDefault] = useState('1');
    const toggleDefault = (id: any) => {
        if (openDefault !== id) {
            setOpenDefault(id);
        }
    };

<Accordion id="default-accordion-example" open={openDefault} toggle={toggleDefault}>
    <AccordionItem>
        <AccordionHeader targetId="1">How to create a group booking ?</AccordionHeader>
        <AccordionBody accordionId="1">
            Although you probably won’t get into any legal trouble if you do it just once, why risk it? If you made your subscribers a promise, you should honor that. If not, you run the risk of a drastic increase in opt outs, which will only hurt you in the long run.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="2">Why do we use it ?</AccordionHeader>
        <AccordionBody accordionId="2">
            No charges are put in place by SlickText when subscribers join your text list. This does not mean however that charges 100% will not occur. Charges that may occur fall under part of the compliance statement stating "Message and Data rates may apply."
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="3">Where does it come from ?</AccordionHeader>
        <AccordionBody accordionId="3">
            Now that you have a general idea of the amount of texts you will need per month, simply find a plan size that allows you to have this allotment, plus some extra for growth. Don't worry, there are no mistakes to be made here. You can always upgrade and downgrade.
        </AccordionBody>
    </AccordionItem>
</Accordion>
`;

const DefaultAccordionExample = () => (
    <PrismCode
        code={defaultAccordionCode}
        language={("js")}
        plugins={["line-numbers"]}
    />
);

// Accordion Flush
const flushAccordionCode =
    `
<!-- Accordion Flush Example -->

    const [openFlush, setOpenFlush] = useState('1');
    const toggleFlush = (id: any) => {
        if (openFlush !== id) {
            setOpenFlush(id);
        }
    };

    <Accordion id="default-accordion-example" flush open={openFlush} toggle={toggleFlush}>
    <AccordionItem>
        <AccordionHeader targetId="1">How do I set up my profile ?</AccordionHeader>
        <AccordionBody accordionId="1">
            The renewal of your SlickText service happens on the anniversary of your original paid sign up date. Upgrading in the middle of your billing period will not change the billing date. Upgrading does however force an immediate, pro-rated charge to take place on your account.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="2">What can I do with my project ?</AccordionHeader>
        <AccordionBody accordionId="2">
            If you had signed up on a free account with Slicktext, then upgraded to a paid plan at a later date, your bill will renew based on the date you had upgraded to a paid plan. All invoices are able to be viewed under your plan options in your SlickText account.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="3">Where can I go to edit voice settings ?</AccordionHeader>
        <AccordionBody accordionId="3">
            No, we cannot provide this information. Opting out from a list is an anonymous, private act. This prevents further harassment. Providing this information is considered bad practice, and further communication after they opt out would be considered against compliance.
        </AccordionBody>
    </AccordionItem>
</Accordion>
`;

const FlushAccordionExample = () => (
    <PrismCode
        code={flushAccordionCode}
        language={("js")}
        plugins={["line-numbers"]}
    />
);


// Accordions with Icons
const iconAccordionCode =
    `
<!-- Accordions with Icons -->

    const [openWithIcons, setOpenWithIcons] = useState('1');
    const toggleWithIcons = (id: any) => {
        if (openWithIcons !== id) {
            setOpenWithIcons(id);
        }
    };

    <Accordion className="custom-accordionwithicon accordion-secondary" id="accordionWithicon" open={openWithIcons} toggle={toggleWithIcons}>
    <AccordionItem>
        <AccordionHeader targetId="1"><i className="ri-global-line me-2"></i> How Does Age Verification Work?</AccordionHeader>
        <AccordionBody accordionId="1">
            Increase or decrease the letter spacing depending on the situation and try, try again until it looks right, and each assumenda labore aes Homo nostrud organic, assumenda labore aesthetic magna elements, buttons, everything.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="2"><i className="ri-user-location-line me-2"></i> How Does Link Tracking Work?</AccordionHeader>
        <AccordionBody accordionId="2">
            Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="3"><i className="ri-pen-nib-line me-2"></i> How Do I Set Up the Drip Feature?</AccordionHeader>
        <AccordionBody accordionId="3">
            Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
        </AccordionBody>
    </AccordionItem>
</Accordion>
`;

const IconAccordionExample = () => (
    <PrismCode
        code={iconAccordionCode}
        language={("js")}
        plugins={["line-numbers"]}
    />
);


// Accordions without Icons
const withIconAccordionCode =
    `
<!-- Accordions without Icons -->

    const [openWithoutIcons, setOpenWithoutIcons] = useState('1');
    const toggleWithoutIcons = (id: any) => {
        if (openWithoutIcons !== id) {
            setOpenWithoutIcons(id);
        }
    };

    <Accordion className="accordion-icon-none" id="accordionWithouticon" open={openWithoutIcons} toggle={toggleWithoutIcons}>
    <AccordionItem>
        <AccordionHeader targetId="1"><i className="ri-global-line me-2"></i> How Does Age Verification Work?</AccordionHeader>
        <AccordionBody accordionId="1">
            Each design is a new, unique piece of art birthed into this world, and while you have the opportunity to be creative and make your own style choices. For that very reason, I went on a quest and spoke to many different professional graphic designers.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="2"><i className="ri-user-location-line me-2"></i> How Does Link Tracking Work?</AccordionHeader>
        <AccordionBody accordionId="2">
            When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="3"><i className="ri-pen-nib-line me-2"></i> How Do I Set Up the Drip Feature?</AccordionHeader>
        <AccordionBody accordionId="3">
            Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
        </AccordionBody>
    </AccordionItem>
</Accordion>
`;

const WithIconAccordionExample = () => (
    <PrismCode
        code={withIconAccordionCode}
        language={("js")}
        plugins={["line-numbers"]}
    />
);


// Accordions with Plus Icon
const plusIconAccordionCode =
    `
<!-- Accordions with Plus Icon -->

    const [openPlusIcon, setOpenPlusIcon] = useState('1');
    const togglePlusIcon = (id: any) => {
        if (openPlusIcon !== id) {
            setOpenPlusIcon(id);
        }
    };

    <Accordion className="custom-accordionwithicon-plus" id="accordionWithplusicon" open={openPlusIcon} toggle={togglePlusIcon}>
    <AccordionItem>
        <AccordionHeader targetId="1">What is User Interface Design?</AccordionHeader>
        <AccordionBody accordionId="1">
            Big July earthquakes confound zany experimental vow. My girl wove six dozen plaid jackets before she quit. Six big devils from Japan quickly forgot how to waltz. try again until it looks right, and each assumenda labore aes Homo nostrud organic, assumenda labore aesthetic magna elements, buttons, everything.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="2">What is Digital Marketing?</AccordionHeader>
        <AccordionBody accordionId="2">
            It makes a statement, it’s impressive graphic design. Increase or decrease the letter spacing depending on the situation and try, try again until it looks right, and each letter has the perfect spot of its own. commodo enim craft beer mlkshk aliquip jean shorts ullamco.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="3">Where does it come from ?</AccordionHeader>
        <AccordionBody accordionId="3">
            Spacing depending on the situation and try, try again until it looks right, and each. next level wes anderson artisan four loko farm-to-table craft beer twee. commodo enim craft beer mlkshk aliquip jean shorts ullamco. omo nostrud organic, assumenda labore aesthetic magna delectus. pposites attract, and that’s a fact.
        </AccordionBody>
    </AccordionItem>
</Accordion>
`;

const PlusIconAccordionExample = () => (
    <PrismCode
        code={plusIconAccordionCode}
        language={("js")}
        plugins={["line-numbers"]}
    />
);


// Left Icon Accordions
const leftIconAccordionCode =
    `
<!-- Left Icon Accordions -->

    const [openLeftIcon, setOpenLeftIcon] = useState('1');
    const toggleLeftIcon = (id: any) => {
        if (openLeftIcon !== id) {
            setOpenLeftIcon(id);
        }
    };


    <Accordion className="lefticon-accordion custom-accordionwithicon accordion-border-box" id="accordionlefticon" open={openLeftIcon} toggle={toggleLeftIcon}>
    <AccordionItem>
        <AccordionHeader targetId="1">What is User Interface Design?</AccordionHeader>
        <AccordionBody accordionId="1">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua nulla assumenda shoreditch et.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="2">What is Digital Marketing?</AccordionHeader>
        <AccordionBody accordionId="2">
            Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="3">Where does it come from ?</AccordionHeader>
        <AccordionBody accordionId="3">
            Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
        </AccordionBody>
    </AccordionItem>
</Accordion>
`;

const LeftIconAccordionExample = () => (
    <PrismCode
        code={leftIconAccordionCode}
        language={("js")}
        plugins={["line-numbers"]}
    />
);


// Accordions Bordered
const borderedAccordionCode =
    `
<!-- Accordions Bordered -->

    const [openBordered, setOpenBordered] = useState('1');
    const toggleBordered = (id: any) => {
        if (openBordered !== id) {
            setOpenBordered(id);
        }
    };

    <Accordion className="custom-accordionwithicon custom-accordion-border accordion-border-box accordion-success" id="accordionBordered" open={openBordered} toggle={toggleBordered}>
    <AccordionItem>
        <AccordionHeader targetId="1">What is User Interface Design?</AccordionHeader>
        <AccordionBody accordionId="1">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua nulla assumenda shoreditch et.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="2">What is Digital Marketing?</AccordionHeader>
        <AccordionBody accordionId="2">
            Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="3">Where does it come from ?</AccordionHeader>
        <AccordionBody accordionId="3">
            Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
        </AccordionBody>
    </AccordionItem>
</Accordion>
`;

const BorderedAccordionExample = () => (
    <PrismCode
        code={borderedAccordionCode}
        language={("js")}
        plugins={["line-numbers"]}
    />
);


// Nesting Accordions
const nestingAccordionCode =
    `
<!-- Nesting Accordions -->

    // Nesting Accordions
    const [openNesting, setOpenNesting] = useState('1');
    const toggleNesting = (id: any) => {
        if (openNesting !== id) {
            setOpenNesting(id);
        }
    };

    // level First Nesting
    const [openNesting1, setOpenNesting1] = useState('1');
    const toggleNesting1 = (id: any) => {
        if (openNesting1 !== id) {
            setOpenNesting1(id);
        }
    };

    // level Second Nesting
    const [openNesting2, setOpenNesting2] = useState('1');
    const toggleNesting2 = (id: any) => {
        if (openNesting2 !== id) {
            setOpenNesting2(id);
        }
    };

    // level Second's First Nesting
    const [openNesting21, setOpenNesting21] = useState('1');
    const toggleNesting21 = (id: any) => {
        if (openNesting21 !== id) {
            setOpenNesting21(id);
        }
    };


    <Accordion className="custom-accordionwithicon accordion-border-box" id="accordionnesting" open={openNesting} toggle={toggleNesting}>
    <AccordionItem>
        <AccordionHeader targetId="1">How Do I Add Contacts/Subscribers?</AccordionHeader>
        <AccordionBody accordionId="1">
            This opt in method is perfect for those looking to integrate a different software such Shopify or Hubspot with Slicktext. For example, upon cashing out online, a subscriber may submit to have their mobile number to receive marketing messages. The API will pass this information from said software over to Slicktext via API integration.
            <Accordion className="nesting2-accordion custom-accordionwithicon accordion-border-box mt-3" id="accordionnesting2" open={openNesting1} toggle={toggleNesting1}>
                <AccordionItem>
                    <AccordionHeader targetId="1">How Do I Search For Contacts?</AccordionHeader>
                    <AccordionBody accordionId="1">
                        When you are in need of finding a specific subscriber, you will want to use the help of SlickText's search navigation tool, located under the Contacts tab of your Slicktext account. Once here, you will have options to sort by, filter, and search your contacts.
                        <Accordion className="nesting4-accordion custom-accordionwithicon accordion-border-box mt-3" id="accordionnesting4" open={openNesting2} toggle={toggleNesting2}>
                            <AccordionItem>
                                <AccordionHeader targetId="1">How do I reset my digital tide watch ?</AccordionHeader>
                                <AccordionBody accordionId="1">
                                    Opting out a subscriber will allow SlickText to maintain the history of the subscriber as it pertains to the textword you are opting them out of. If this user was to text to join again, the initial text they are met with will be a "welcome back" message instead of the auto reply.
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="2">How Do I Delete a Contact From My List?</AccordionHeader>
                    <AccordionBody accordionId="2">
                        Opting out a subscriber will allow SlickText to maintain the history of the subscriber as it pertains to the textword you are opting them out of. If this user was to text to join again, the initial text they are met with will be a "welcome back" message instead of the auto reply.
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="2">How Does Personalization Work?</AccordionHeader>
        <AccordionBody accordionId="2">
            Personalization allows you to provide a personal touch to your outbound text marketing campaigns. SlickText uses merge tags as placeholders that are replaced with contact-specific information when a text message is sent. These merge tags may also be known as personalization fields.
            <Accordion className="nesting3-accordion custom-accordionwithicon accordion-border-box mt-3" id="accordionnesting3" open={openNesting21} toggle={toggleNesting21} >
                <AccordionItem className='mt-2'>
                    <AccordionHeader targetId="1">How does temperature impact my watch?</AccordionHeader>
                    <AccordionBody accordionId="1">
                        Opting out a subscriber will allow SlickText to maintain the history of the subscriber as it pertains to the textword you are opting them out of. If this user was to text to join again, the initial text they are met with will be a "welcome back" message instead of the auto reply.
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="3">What Happens When I Run Out of Messages?</AccordionHeader>
        <AccordionBody accordionId="3">
            When you run out of messages, you will not be able to send any outbound campaigns. This would include any scheduled messages, drip campaigns, and birthday messages. However, we will continue to deliver your auto-reply messages to allow your subscriber list to continue to grow.
        </AccordionBody>
    </AccordionItem>
</Accordion>
`;

const NestingAccordionExample = () => (
    <PrismCode
        code={nestingAccordionCode}
        language={("js")}
        plugins={["line-numbers"]}
    />
);


// Accordions Fill Colored
const fillColoredAccordionCode =
    `
<!-- Accordions Fill Colored -->

    const [openFillColored, setOpenFillColored] = useState('1');
    const toggleFillColored = (id: any) => {
        if (openFillColored !== id) {
            setOpenFillColored(id);
        }
    };

    <Accordion className="custom-accordionwithicon accordion-fill-success" id="accordionFill" open={openFillColored} toggle={toggleFillColored}>
    <AccordionItem>
        <AccordionHeader targetId="1">What are webhooks?</AccordionHeader>
        <AccordionBody accordionId="1">
            Webhooks allow you to gather real time data on key interactions that happen with your Slick Text account. Simply provide us with a url where you'd like the data to be sent, choose which events you'd like to be informed of, and click save.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="2">Where can I find my Textword ID?</AccordionHeader>
        <AccordionBody accordionId="2">
            Head over to the Textwords page. Click options on the right hand side, and then click Settings. This will redirect you to your Textword Setting page. Now, go check your url, and the textword ID will be the number after "word=". Too much or too little spacing, as in the example below.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="3">Where is your API documentation?</AccordionHeader>
        <AccordionBody accordionId="3">
            You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you’re working with reputable font websites.
        </AccordionBody>
    </AccordionItem>
</Accordion>


<!-- Accordions Fill Colored -->

    const [openFillColored1, setOpenFillColored1] = useState('1');
    const toggleFillColored1 = (id: any) => {
        if (openFillColored1 !== id) {
            setOpenFillColored1(id);
        }
    };

    <Accordion className="custom-accordionwithicon accordion-flush accordion-fill-secondary" id="accordionFill2" open={openFillColored1} toggle={toggleFillColored1}>
    <AccordionItem>
        <AccordionHeader targetId="1">How Does Age Verification Work?</AccordionHeader>
        <AccordionBody accordionId="1">
            Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="2">What Kind of List Growth Should I Expect?</AccordionHeader>
        <AccordionBody accordionId="2">
            Consistency is the one thing that can take all of the different elements in your design, and tie them all together and make them work. In an awareness campaign, it is vital for people to begin put 2 and 2 together and begin to recognize your cause. Consistency piques people’s interest.
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="3">How Do I Delete a Contact From My List?</AccordionHeader>
        <AccordionBody accordionId="3">
            Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
        </AccordionBody>
    </AccordionItem>
</Accordion>
`;

const FillColoredAccordionExample = () => (
    <PrismCode
        code={fillColoredAccordionCode}
        language={("js")}
        plugins={["line-numbers"]}
    />
);


// Collapse Example
const collapseCode =
    `
<!-- Collapse Example -->

    const [coll1, setcoll1] = useState<boolean>(true);

    const t_coll1 = () => {
        setcoll1(!coll1);
    };

<div className="d-flex gap-2 flex-wrap mb-3">
    <Link to="#" onClick={t_coll1} style={{ cursor: "pointer" }} className="btn btn-primary" >
        Link with href{" "}
    </Link>
    <Button
        color="primary"
        onClick={t_coll1}
        style={{ cursor: "pointer" }}
    >
        Button with data-target
    </Button>
</div>
<Collapse isOpen={coll1} id="collapseExample">
    <div className="card mb-0">
        <CardBody>
            When designing, the goal is to draw someone’s attention and portray to them what you’re trying to say. You can make a big statement by using little tricks, like this one. Use contrasting fonts. you can use a bold sanserif font with a cursive.
        </CardBody>
    </div>
</Collapse>
`;

const CollapseExample = () => (
    <PrismCode
        code={collapseCode}
        language={("js")}
        plugins={["line-numbers"]}
    />
);


// Horizontal Collapse
const horizontalCollapseCode =
    `
<!-- Horizontal Collapse -->

    const [coll2, setcoll2] = useState<boolean>(true);

    const t_coll2 = () => {
        setcoll2(!coll2);
    };

<p>
    <Button onClick={t_coll2} color="primary" style={{ cursor: "pointer" }} > Toggle width collapse </Button>
</p>
<div>
    <Collapse isOpen={coll2} id="collapseWidthExample" horizontal>
        <div className="card card-body mb-0" style={{ width: "300px" }}>
            This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
        </div>
    </Collapse>
</div>
`;

const HorizontalCollapseExample = () => (
    <PrismCode
        code={horizontalCollapseCode}
        language={("js")}
        plugins={["line-numbers"]}
    />
);


// Collapse with Icon
const iconCollapseCode =
    `
<!-- Collapse with Icon -->

    const [coll6, setcoll6] = useState<boolean>(true);
    const [coll7, setcoll7] = useState<boolean>(false);

    const t_coll6 = () => {
        setcoll6(!coll6);
    };

    const t_coll7 = () => {
        setcoll7(!coll7);
    };

<div className="hstack gap-3 mb-3">
    <Link to="#" onClick={t_coll6} style={{ cursor: "pointer" }} className="link-success" >
        <i className="ri-arrow-down-circle-line fs-16"></i>
    </Link>
    <Button color="light" onClick={t_coll7} style={{ cursor: "pointer" }} >
        <i className="ri-filter-2-line"></i>
    </Button>
</div>
<Collapse isOpen={coll6} id="collapseWithicon">
    <div className="card mb-0">
        <CardBody>
            If you enter text including symbols in the search criteria, the search criteria is interpreted exactly as you entered it, and the search is case sensitive as a case insensitive search that contains certain text but does also provide a lot of search criteria options.
        </CardBody>
    </div>
</Collapse>
<Collapse isOpen={coll7} id="collapseWithicon2">
    <div className="card mb-0 mt-3">
        <CardBody>
            When you want to search for data, such as customer names, addresses, or product groups, you enter criteria. In search criteria you can use all the numbers and letters that you normally use in the specific field. In addition, you can use special symbols to further filter the results.
        </CardBody>
    </div>
</Collapse>
`;

const IconCollapseExample = () => (
    <PrismCode
        code={iconCollapseCode}
        language={("js")}
        plugins={["line-numbers"]}
    />
);


// Inline & Block Element Collapse
const inlineBLockCollapseCode =
    `
<!-- Inline & Block Element Collapse -->

    const [coll8, setcoll8] = useState<boolean>(true);
    const [coll9, setcoll9] = useState<boolean>(true);

    const t_coll8 = () => {
        setcoll8(!coll8);
    };

    const t_coll9 = () => {
        setcoll9(!coll9);
    };

<div className="mb-3">
    <h6 className="text-primary" onClick={t_coll8}>
        <code>&lt;h6&gt;</code> Inline Element Collapse
    </h6>
    <span role="button" className="text-primary fw-medium" onClick={t_coll9}>
        <code>&lt;span&gt;</code> Block Element Collapse
    </span>
</div>
<Row className="g-2">
    <Col className="col-auto">
        <Collapse isOpen={coll8} id="collapseblock" horizontal>
            <div className="card card-body mb-0" style={{ width: "300px" }}>
                A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring heart.
            </div>
        </Collapse>
    </Col>
    <Col className="col-auto">
        <Collapse isOpen={coll9} id="collapseinline" horizontal>
            <div className="card card-body mb-0" style={{ width: "300px" }}>
                When you have created a new account schedule and set up the rows, you must set up columns.
            </div>
        </Collapse>
    </Col>
</Row>
`;

const InlineBLockCollapseExample = () => (
    <PrismCode
        code={inlineBLockCollapseCode}
        language={("js")}
        plugins={["line-numbers"]}
    />
);


// Multiple Targets Collapse
const multipleTargetCollapseCode =
    `
<!-- Multiple Targets Collapse -->

    const [coll3, setcoll3] = useState<boolean>(true);
    const [coll4, setcoll4] = useState<boolean>(true);

    const t_coll3 = () => {
        setcoll3(!coll3);
    };

    const t_coll4 = () => {
        setcoll4(!coll4);
    };

    const t_coll5 = () => {
        setcoll3(!coll3);
        setcoll4(!coll4);
    };

<div className="d-flex gap-2 flex-wrap mb-3">
    <Link to="#" onClick={t_coll3} style={{ cursor: "pointer" }} className="btn btn-primary" > Toggle First Element </Link>
    <Button onClick={t_coll4} color="primary" style={{ cursor: "pointer" }} > Toggle Second Element </Button>
    <Button onClick={t_coll5} color="primary" style={{ cursor: "pointer" }} > Toggle Both Elements </Button>
</div>
<Row>
    <div className="col">
        <Collapse isOpen={coll3} id="multiCollapseExample1">
            <Card>
                <div className="card card-body mb-0">
                    Some placeholder content for the first collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
                </div>
            </Card>
        </Collapse>
    </div>
    <div className="col">
        <Collapse isOpen={coll4} id="multiCollapseExample2">
            <Card>
                <div className="card card-body mb-0">
                    Some placeholder content for the second collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
                </div>
            </Card>
        </Collapse>
    </div>
</Row>
`;

const MultipleTargetCollapseExample = () => (
    <PrismCode
        code={multipleTargetCollapseCode}
        language={("js")}
        plugins={["line-numbers"]}
    />
);

export { DefaultAccordionExample, FlushAccordionExample, IconAccordionExample, WithIconAccordionExample, PlusIconAccordionExample, LeftIconAccordionExample, BorderedAccordionExample, NestingAccordionExample, FillColoredAccordionExample, CollapseExample, HorizontalCollapseExample, IconCollapseExample, InlineBLockCollapseExample, MultipleTargetCollapseExample };