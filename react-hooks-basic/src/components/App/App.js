import React, { useCallback, useRef, useState, useEffect } from 'react';
import { ResourceItem, ResourceList, TextStyle, AppProvider, ActionList, Avatar, Card, ContextualSaveBar, FormLayout, Frame, Layout, Loading, Modal, Navigation, Page, SkeletonBodyText, SkeletonDisplayText, SkeletonPage, TextContainer, TextField, Toast, TopBar, Button } from '@shopify/polaris';
import { ArrowLeftMinor, ConversationMinor, HomeMajor, OrdersMajor } from '@shopify/polaris-icons';
import theme from '../../config/theme';

export default function FrameExample() {
  const defaultState = useRef({
    emailFieldValue: 'Your Email',
    nameFieldValue: 'Your Name',
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const skipToContentRef = useRef(null);
  const [toastActive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [storeName, setStoreName] = useState(
    defaultState.current.nameFieldValue,
  );

  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    [],
  );
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );
  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    [],
  );

  const toastMarkup = toastActive ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
  ) : null;

  const userMenuActions = [
    {
      items: [{ content: 'Community forums' }],
    },
  ];

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: () => { },
      }}
      discardAction={{
        onAction: () => { },
      }}
    />
  ) : null;

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Dharma"
      detail={storeName}
      initials="D"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );


  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: 'Back to Shopify',
            icon: ArrowLeftMinor,
          },
        ]}
      />
      <Navigation.Section
        separator
        title="Jaded Pixel App"
        items={[
          {
            label: 'Dashboard',
            icon: HomeMajor,
            onClick: toggleIsLoading,
          },
          {
            label: 'Jaded Pixel Orders',
            icon: OrdersMajor,
            onClick: toggleIsLoading,
          },
        ]}

      />
    </Navigation>
  );

  const loadingMarkup = isLoading ? <Loading /> : null;

  const actualPageMarkup = (
    <Page title="Todo"
      primaryAction={{ content: 'Save' }}
    >

      <Card>
        <ResourceList
          resourceName={{ singular: 'customer', plural: 'customers' }}
          items={[
            {
              id: 100,
              url: 'customers/341',
              name: 'Mae Jemison',
              location: 'Decatur, USA',
            },
            {
              id: 200,
              url: 'customers/256',
              name: 'Ellen Ochoa',
              location: 'Los Angeles, USA',
            },
          ]}
          renderItem={(item) => {
            const { id, url, name, location, latestOrderUrl } = item;
            const media = <Avatar customer size="medium" name={name} />;
            const shortcutActions = latestOrderUrl
              ? [{ content: 'View latest order', url: latestOrderUrl }]
              : null;

            return (
              <ResourceItem
                id={id}
                url={url}
                media={media}
                accessibilityLabel={`View details for ${name}`}
              >
                <h3>
                  <TextStyle variation="strong">{name}</TextStyle>
                </h3>
                <div>{location}</div>
              </ResourceItem>
            );
            
          }}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          selectable
        />
      </Card>

    </Page>
  );
  

  const loadingPageMarkup = (
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={9} />
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );

  const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

  return (
    <div style={{ height: '500px' }}>
      <AppProvider
        theme={theme}
        i18n={{
          Polaris: {
            Avatar: {
              label: 'Avatar',
              labelWithInitials: 'Avatar with initials {initials}',
            },
            ContextualSaveBar: {
              save: 'Save',
              discard: 'Discard',
            },
            TextField: {
              characterCount: '{count} characters',
            },
            TopBar: {
              toggleMenuLabel: 'Toggle menu',

              SearchField: {
                clearButtonLabel: 'Clear',
                search: 'Search',
              },
            },
            Modal: {
              iFrameTitle: 'body markup',
            },
            Frame: {
              skipToContent: 'Skip to content',
              navigationLabel: 'Navigation',
              Navigation: {
                closeMobileNavigationLabel: 'Close navigation',
              },
            },
          },
        }}
      >
        <Frame
          topBar={topBarMarkup}
          navigation={navigationMarkup}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
          skipToContentTarget={skipToContentRef.current}
        >
          {contextualSaveBarMarkup}
          {loadingMarkup}
          {pageMarkup}
          {toastMarkup}
        </Frame>
      </AppProvider>
    </div>
  );
}
