import { test, expect } from '@playwright/test';
import WpAdminPage from '../../../pages/wp-admin-page';
const { expectScreenshotToMatchLocator, setTitleTextTag, setTitleIconPosition, setTitleHorizontalAlignment } = require( './helper' );

test.describe( 'Nested Accordion Content Tests @nested-accordion', () => {
	test.beforeAll( async ( { browser }, testInfo ) => {
		const page = await browser.newPage();
		const wpAdmin = await new WpAdminPage( page, testInfo );

		await wpAdmin.setExperiments( {
			container: 'active',
			'nested-elements': 'active',
		} );

		await page.close();
	} );

	test.afterAll( async ( { browser }, testInfo ) => {
		const context = await browser.newContext();
		const page = await context.newPage();
		const wpAdmin = new WpAdminPage( page, testInfo );
		await wpAdmin.setExperiments( {
			'nested-elements': 'inactive',
			container: 'inactive',
		} );

		await page.close();
	} );

	test( 'Nested Accordion Title Icon and Text Vertical Alignment', async ( { browser }, testInfo ) => {
		const page = await browser.newPage(),
			wpAdmin = new WpAdminPage( page, testInfo ),
			editor = await wpAdmin.openNewPage(),
			frame = editor.getPreviewFrame(),
			nestedAccordionWidgetId = '48f02ad',
			nestedAccordionTitle = frame.locator( '.e-n-accordion-item-title' ).first();

		await editor.loadJsonPageTemplate( __dirname, 'nested-accordion-title-and-icons', '.elementor-widget-n-accordion' );

		await editor.closeNavigatorIfOpen();

		await test.step( 'Check title <h1> text and icon alignment', async () => {
			const tag = 'h1';
			await frame.waitForLoadState( 'load' );
			await setTitleTextTag( tag, nestedAccordionWidgetId, editor, page );
			// Assert
			await expectScreenshotToMatchLocator( `nested-accordion-title-${ tag }-alignment.png`, nestedAccordionTitle );
		} );

		await test.step( 'Check title <h2> text and icon alignment', async () => {
			const tag = 'h2';
			await frame.waitForLoadState( 'load' );
			await setTitleTextTag( tag, nestedAccordionWidgetId, editor, page );
			// Assert
			await expectScreenshotToMatchLocator( `nested-accordion-title-${ tag }-alignment.png`, nestedAccordionTitle );
		} );

		await test.step( 'Check title <h3> text and icon alignment', async () => {
			const tag = 'h3';
			await frame.waitForLoadState( 'load' );
			await setTitleTextTag( tag, nestedAccordionWidgetId, editor, page );
			// Assert
			await expectScreenshotToMatchLocator( `nested-accordion-title-${ tag }-alignment.png`, nestedAccordionTitle );
		} );

		await test.step( 'Check title <h4> text and icon alignment', async () => {
			const tag = 'h4';
			await frame.waitForLoadState( 'load' );
			await setTitleTextTag( tag, nestedAccordionWidgetId, editor, page );
			// Assert
			await expectScreenshotToMatchLocator( `nested-accordion-title-${ tag }-alignment.png`, nestedAccordionTitle );
		} );

		await test.step( 'Check title <h5> text and icon alignment', async () => {
			const tag = 'h5';
			await frame.waitForLoadState( 'load' );
			await setTitleTextTag( tag, nestedAccordionWidgetId, editor, page );
			// Assert
			await expectScreenshotToMatchLocator( `nested-accordion-title-${ tag }-alignment.png`, nestedAccordionTitle );
		} );

		await test.step( 'Check title <h6> text and icon alignment', async () => {
			const tag = 'h6';
			await frame.waitForLoadState( 'load' );
			await setTitleTextTag( tag, nestedAccordionWidgetId, editor, page );
			// Assert
			await expectScreenshotToMatchLocator( `nested-accordion-title-${ tag }-alignment.png`, nestedAccordionTitle );
		} );

		await test.step( 'Check title <p> text and icon alignment', async () => {
			const tag = 'p';
			await frame.waitForLoadState( 'load' );
			await setTitleTextTag( tag, nestedAccordionWidgetId, editor, page );
			// Assert
			await expectScreenshotToMatchLocator( `nested-accordion-title-${ tag }-alignment.png`, nestedAccordionTitle );
		} );

		await test.step( 'Check title <span> text and icon alignment', async () => {
			const tag = 'span';
			await frame.waitForLoadState( 'load' );
			await setTitleTextTag( tag, nestedAccordionWidgetId, editor, page );
			// Assert
			await expectScreenshotToMatchLocator( `nested-accordion-title-${ tag }-alignment.png`, nestedAccordionTitle );
		} );

		await test.step( 'Check title <div> text and icon alignment', async () => {
			const tag = 'div';
			await frame.waitForLoadState( 'load' );
			await setTitleTextTag( tag, nestedAccordionWidgetId, editor, page );
			// Assert
			await expectScreenshotToMatchLocator( `nested-accordion-title-${ tag }-alignment.png`, nestedAccordionTitle );
		} );
	} );

	test( 'Nested Accordion test SVG Icon and No Icon', async ( { browser }, testInfo ) => {
		const page = await browser.newPage(),
			wpAdmin = new WpAdminPage( page, testInfo );

		await wpAdmin.enableAdvancedUploads();
		const editor = await wpAdmin.openNewPage();
		editor.postId = await editor.getPageId();
		let frame = editor.getPreviewFrame();

		const container = await editor.addElement( { elType: 'container' }, 'document' );
		await editor.addWidget( 'nested-accordion', container );
		await editor.closeNavigatorIfOpen();

		await test.step( 'Check that an SVG title icon is displayed', async () => {
			await frame.locator( '.e-n-accordion-item-title' ).first().click();
			await page.locator( '.elementor-control-icons--inline__svg' ).first().click();
			const editorTitleIcons = frame.locator( '.e-n-accordion-item-title-icon' );

			await editor.uploadSVG();

			await test.step( 'Check that SVG icon is displayed in the editor', async () => {
				// Default icon is tested in Element Regression Screenshot Test
				// Expect default icon to be displayed in preview frame & front end
				await expect.soft( editorTitleIcons ).toHaveCount( 3 ); // Item Title Icon wrapper is displayed in Editor when SVG icon is selected
				await expect.soft( editorTitleIcons.locator( '.e-closed svg' ) ).toHaveCount( 3 ); // SVG Icon
			} );

			await test.step( 'Check that SVG icon is displayed in the front end', async () => {
				await editor.publishAndViewPage();
				const titleIcons = page.locator( '.e-n-accordion-item-title-icon' );

				await expect.soft( titleIcons ).toHaveCount( 3 ); // Item Title Icon wrapper is displayed in Editor when SVG icon is selected
				await expect.soft( page.locator( '.e-n-accordion-item-title-icon .e-closed svg' ) ).toHaveCount( 3 ); // SVG Icon
			} );
		} );

		await test.step( 'Check that No Icon container is displayed when Title Icons is disabled', async () => {
			await editor.gotoPostId();
			frame = editor.getPreviewFrame();

			await frame.locator( '.e-n-accordion-item-title' ).first().click();
			await page.locator( '.elementor-control-inline-icon .elementor-control-icons--inline__none' ).first().click();

			const editorFirstItem = frame.locator( '.e-n-accordion-item' ).first();

			await test.step( 'Expect no icon or .e-n-accordion-item-title-icon wrapper to be displayed in preview frame', async () => {
				await editor.isUiStable( editorFirstItem );
				await expectScreenshotToMatchLocator( 'nested-accordion-no-icons.png', editorFirstItem );
			} );

			await test.step( 'Expect no icon or .e-n-accordion-item-title-icon wrapper to be displayed in front end', async () => {
				await editor.publishAndViewPage();
				const firstItem = page.locator( '.e-n-accordion-item' ).first();
				await editor.isUiStable( firstItem );
				await expectScreenshotToMatchLocator( 'nested-accordion-fe-no-icons.png', firstItem );
			} );
		} );

		await test.step( 'Disable Advanced Uploads', async () => {
			await wpAdmin.disableAdvancedUploads();
		} );
	} );
	test( 'Nested Accordion Title, Text and Icon Position', async ( { browser }, testInfo ) => {
		// Act
		const page = await browser.newPage(),
			wpAdmin = new WpAdminPage( page, testInfo ),
			editor = await wpAdmin.openNewPage();

		await editor.loadJsonPageTemplate( __dirname, 'nested-accordion-title-and-icons', '.elementor-widget-n-accordion' );

		await editor.closeNavigatorIfOpen();

		const nestedAccordionWidgetId = '48f02ad',
			frame = editor.getPreviewFrame(),
			nestedAccordionTitle = frame.locator( '.e-n-accordion-item-title' ).first();

		await test.step( 'If Accordion is open fa-minus is displayed', async () => {
			// Assert
			await expect.soft( await nestedAccordionTitle.locator( '.e-opened' ).locator( 'i' ) ).toHaveClass( 'fas fa-minus' );
			await expect.soft( await nestedAccordionTitle.locator( '.e-opened' ) ).toBeVisible();
			await expect.soft( await nestedAccordionTitle.locator( '.e-closed' ) ).toBeHidden();
		} );

		await test.step( 'If Accordion is closed fa-plus is displayed & fa-minus icon is hidden', async () => {
			await nestedAccordionTitle.click();
			await editor.isUiStable( nestedAccordionTitle, 3, 1000 );
			await expect.soft( await nestedAccordionTitle.locator( '.e-closed' ).locator( 'i' ) ).toHaveClass( 'fas fa-plus' );
			await expect.soft( await nestedAccordionTitle.locator( '.e-closed' ) ).toBeVisible();
			await expect.soft( await nestedAccordionTitle.locator( '.e-opened' ) ).toBeHidden();
			await editor.isUiStable( nestedAccordionTitle, 3, 1500 );
			await nestedAccordionTitle.click();
		} );

		await editor.selectElement( nestedAccordionWidgetId );

		await test.step( 'Check title position default start', async () => {
			await editor.selectElement( nestedAccordionWidgetId );
			// Assert
			// normal = Flex-start
			await expect.soft( nestedAccordionTitle ).toHaveCSS( 'justify-content', 'normal' );

			await setTitleHorizontalAlignment( 'start', editor );
			await editor.isUiStable( nestedAccordionTitle, 3 );
			await expect.soft( nestedAccordionTitle ).toHaveCSS( 'justify-content', 'normal' );
		} );

		await test.step( 'Check title position end', async () => {
			// Act
			await editor.selectElement( nestedAccordionWidgetId );
			await setTitleHorizontalAlignment( 'end', editor );
			// Assert
			await editor.isUiStable( nestedAccordionTitle, 3 );
			await expect.soft( nestedAccordionTitle ).toHaveCSS( 'justify-content', 'flex-end' );
		} );

		await test.step( 'Check title position center', async () => {
			// Act
			await editor.selectElement( nestedAccordionWidgetId );
			await setTitleHorizontalAlignment( 'center', editor );
			// Assert
			await editor.isUiStable( nestedAccordionTitle, 3 );
			await expect.soft( nestedAccordionTitle ).toHaveCSS( 'justify-content', 'center' );
		} );

		await test.step( 'Check title position justify', async () => {
			// Act
			await editor.selectElement( nestedAccordionWidgetId );
			await setTitleHorizontalAlignment( 'stretch', editor );
			// Assert
			await editor.isUiStable( nestedAccordionTitle, 3 );
			await expect.soft( nestedAccordionTitle ).toHaveCSS( 'justify-content', 'space-between' );
		} );

		await test.step( 'Check title icon position left', async () => {
			// Assert
			await expect.soft( nestedAccordionTitle.locator( '.e-n-accordion-item-title-icon' ) ).toHaveCSS( 'order', '-1' );
		} );

		await test.step( 'Check title icon position right', async () => {
			// Act
			await editor.selectElement( nestedAccordionWidgetId );
			await setTitleIconPosition( 'right', editor );
			// Assert
			await editor.isUiStable( nestedAccordionTitle, 3 );
			await expect.soft( nestedAccordionTitle.locator( '.e-n-accordion-item-title-icon' ) ).toHaveCSS( 'order', '0' );
		} );

		await test.step( 'Change to mobile mode', async () => {
			// Act
			await editor.selectElement( nestedAccordionWidgetId );
			await page.getByText( 'Desktop Tablet Portrait Mobile Portrait' ).first().click();
			await page.getByRole( 'button', { name: 'Mobile Portrait' } ).first().click();
		} );

		await test.step( 'Mobile -Check that the title icon is displayed', async () => {
			// Assert
			await expect.soft( await nestedAccordionTitle.locator( '.e-opened' ).locator( 'i' ) ).toHaveClass( 'fas fa-minus' );
			await expect.soft( await nestedAccordionTitle.locator( '.e-opened' ) ).toBeVisible();
			await expect.soft( await nestedAccordionTitle.locator( '.e-closed' ) ).toBeHidden();
		} );

		await test.step( 'Mobile - Check that icon changes when the mobile Accordion is opened', async () => {
			await frame.waitForLoadState( 'load' );
			await nestedAccordionTitle.click();
			await expect.soft( await nestedAccordionTitle.locator( '.e-closed' ).locator( 'i' ) ).toHaveClass( 'fas fa-plus' );
			await expect.soft( await nestedAccordionTitle.locator( '.e-closed' ) ).toBeVisible();
			await expect.soft( await nestedAccordionTitle.locator( '.e-opened' ) ).toBeHidden();
			await nestedAccordionTitle.click();
		} );

		await test.step( 'Mobile - Check title position mobile is default start', async () => {
			// Assert
			await expect.soft( nestedAccordionTitle ).toHaveCSS( 'justify-content', 'normal' );
		} );

		await test.step( 'Mobile - Check title position mobile is flex-end', async () => {
			// Act
			await editor.selectElement( nestedAccordionWidgetId );
			await setTitleHorizontalAlignment( 'end', editor, 'mobile' );
			// Assert
			await editor.isUiStable( nestedAccordionTitle, 3 );
			await expect.soft( nestedAccordionTitle ).toHaveCSS( 'justify-content', 'flex-end' );
		} );

		await test.step( 'Mobile - Check title position mobile is center', async () => {
			// Act
			await editor.selectElement( nestedAccordionWidgetId );
			await setTitleHorizontalAlignment( 'center', editor, 'mobile' );
			// Assert
			await editor.isUiStable( nestedAccordionTitle, 3 );
			await expect.soft( nestedAccordionTitle ).toHaveCSS( 'justify-content', 'center' );
		} );

		await test.step( 'Mobile - Check title position mobile is justify', async () => {
			// Act
			await editor.selectElement( nestedAccordionWidgetId );
			await setTitleHorizontalAlignment( 'stretch', editor, 'mobile' );
			// Assert
			await editor.isUiStable( nestedAccordionTitle, 3 );
			await expect.soft( nestedAccordionTitle ).toHaveCSS( 'justify-content', 'space-between' );
		} );

		await test.step( 'Mobile - Check title icon position right', async () => {
			// Assert
			await expect.soft( nestedAccordionTitle.locator( '.e-n-accordion-item-title-icon' ) ).toHaveCSS( 'order', '0' );
		} );

		await test.step( 'Mobile - Check title icon position left', async () => {
			// Act
			await editor.selectElement( nestedAccordionWidgetId );
			await setTitleIconPosition( 'left', editor, 'mobile' );
			// Assert
			await editor.isUiStable( nestedAccordionTitle, 3 );
			await expect.soft( nestedAccordionTitle.locator( '.e-n-accordion-item-title-icon' ) ).toHaveCSS( 'order', '-1' );
		} );
	} );

	test( 'Nested Accordion animation', async ( { page }, testInfo ) => {
		const wpAdmin = new WpAdminPage( page, testInfo ),
			editor = await wpAdmin.openNewPage(),
			container = await editor.addElement( { elType: 'container' }, 'document' ),
			frame = editor.getPreviewFrame(),
			nestedAccordionID = await editor.addWidget( 'nested-accordion', container ),
			animationDuration = 500;

		await editor.closeNavigatorIfOpen();
		await editor.selectElement( nestedAccordionID );

		await test.step( 'Check closing animation', async () => {
			const itemVisibilityBeforeAnimation = await frame.isVisible( '.e-n-accordion-item:first-child > .e-con' );

			expect.soft( itemVisibilityBeforeAnimation ).toEqual( true );

			await frame.locator( '.e-n-accordion-item:first-child > .e-n-accordion-item-title' ).click();

			// Wait for the closing animation to complete
			await page.waitForTimeout( animationDuration );

			// Check the computed height
			const maxHeightAfterClose = await frame.locator( '.e-n-accordion-item:first-child > .e-con' ).evaluate( ( element ) =>
				window.getComputedStyle( element ).getPropertyValue( 'height' ),
			);

			expect.soft( maxHeightAfterClose ).toEqual( '0px' );
		} );

		await test.step( 'Check open animation', async () => {
			const itemVisibilityBeforeAnimation = await frame.isVisible( '.e-n-accordion-item:first-child > .e-con' );

			expect.soft( itemVisibilityBeforeAnimation ).toEqual( false );

			await frame.locator( '.e-n-accordion-item:first-child > .e-n-accordion-item-title' ).click();

			// Wait for the open animation to complete
			await page.waitForTimeout( animationDuration );

			// Check the computed height
			const maxHeightAfterOpen = await frame.locator( '.e-n-accordion-item:first-child > .e-con' ).evaluate( ( element ) =>
				window.getComputedStyle( element ).getPropertyValue( 'height' ),
			);

			expect.soft( maxHeightAfterOpen ).not.toEqual( '0px' );
		} );
	} );
} );
