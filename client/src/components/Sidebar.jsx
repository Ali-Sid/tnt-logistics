import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as ChakraLink, Flex, Icon, IconButton, VStack, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom'

const Sidebar = ({ isOpen, toggleSidebar }) => {

  // const sidebarWidth = useBreakpointValue({ base: '0px', md: '200px' });
  // const sidebarContentWidth = useBreakpointValue({ base: '0px', md: '100%' });
  return (
    <Flex direction="column"
      bg="#f10001"
      opacity="99%"
      color="#fff"
      h="100vh"
      // w={isOpen ? sidebarWidth : '50px'}
      w="200px"
      position="fixed"
      top="5%"
      left="0"
      zIndex="10"
      boxShadow="2xl"
      overflowX="hidden"
      transition="width 0.3s ease"
    >
      <Flex justify="space-between" p="4" alignItems="center" >
        {isOpen ? (
          <IconButton
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            icon={<Icon color="#fff" backgroundColor="#f10001" border="none"
              _focus={{
                boxShadow: "none",
                border: "none",
                // outline: "none", // Remove the default focus outline
              }}
              _hover={{
                boxShadow: "none", // Remove shadow on hover
                border: "none", // Remove border on hover
              }}
              as={HamburgerIcon} />}
            onClick={toggleSidebar}
            focusbordercolor="transparent"
            focusborderwidth="0"
            focusvisible="false"
          />
        ) : (
          <IconButton
            aria-label="Open sidebar" border="none"
            _focus={{
              boxShadow: "none",
              border: "none",
              outline: "none", // Remove the default focus outline
            }}
            _hover={{
              boxShadow: "none", // Remove shadow on hover
              border: "none", // Remove border on hover
            }}
            _active={{
              boxShadow: "none", // Remove active shadow
              border: "none", // Ensure no border on active
            }}
            _disabled={{
              boxShadow: "none", // Remove disabled shadow
              border: "none", // Ensure no border on disabled
            }}
            _before={{
              boxShadow: "none", // Remove before pseudo-element shadow
              border: "none", // Ensure no border on before pseudo-element
            }}
            _after={{
              boxShadow: "none", // Remove after pseudo-element shadow
              border: "none", // Ensure no border on after pseudo-element
            }}
            icon={<Icon color="#fff" border="none"
              _focus={{
                boxShadow: "none",
                border: "none",
                outline: "none", // Remove the default focus outline
              }}
              _hover={{
                boxShadow: "none", // Remove shadow on hover
                border: "none", // Remove border on hover
              }}
              _active={{
                boxShadow: "none", // Remove active shadow
                border: "none", // Ensure no border on active
              }}
              _disabled={{
                boxShadow: "none", // Remove disabled shadow
                border: "none", // Ensure no border on disabled
              }}
              _before={{
                boxShadow: "none", // Remove before pseudo-element shadow
                border: "none", // Ensure no border on before pseudo-element
              }}
              _after={{
                boxShadow: "none", // Remove after pseudo-element shadow
                border: "none", // Ensure no border on after pseudo-element
              }}
              focusbordercolor="transparent"
              focusborderwidth="0"
              as={HamburgerIcon} />}
            onClick={toggleSidebar}
            focusvisible="false"
          />


        )}
      </Flex>
      <VStack spacing="4" p="4" align="start">
        <ChakraLink as={ReactRouterLink} color="#fff" to='/dashboard'>Dashboard</ChakraLink>
        <ChakraLink as={ReactRouterLink} color="#fff" to='/'>Items</ChakraLink>
        <ChakraLink as={ReactRouterLink} color="#fff" to='/items'>Packing</ChakraLink>
        <ChakraLink as={ReactRouterLink} color="#fff" to='/items'>Aggregate</ChakraLink>
      </VStack>
    </Flex>
  );
};

export default Sidebar;
